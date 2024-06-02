# How to deploy a blog to AWS EC2

It's always a headache to deploy a blog or any other app to a cloud server. Fortunately, we can use GitHub Actions or any other CI/CD tool to automate many of the same steps. Before that we need setup the server.

AWS Elastic Compute Cloud or AWS EC2 is my choice, but I believe other services would work well too. The following content should also work for other services.

## Select a pricing plan

At first, I chose the [t4g.micro plan](https://aws.amazon.com/ec2/instance-types/t4/). It's the cheapest option for 1 GB memory machines.

Although it's ARM-based, the blog app already works well on my ARM-based MacBook. So I decided to give it a try, and it works great! I even got a better score on [PageSpeed Insights](https://pagespeed.web.dev/) compared to the same 1GB memory x86 machine.

I also tried the 0.5 GB memory machine, but it gets stuck on `next build` step. Therefore, a 1 GB configuration should be the minimum requirement.

## List all requirements

To make it work, we simply need several things:
1. Node.js to run this blog app
2. Enable https
3. Run app automaticlly on server boot

The first one is essential so I think no explanation is needed. I use [https://github.com/tj/n](https://github.com/tj/n) which is a lightweight tool with minimal dependencies.

The second requirement is HTTPS, which is crucial for enhancing website security and potentially improving SEO rankings. I use [Let's Encrypt](https://letsencrypt.org/). It's free! And it can automate all the process by its open source tool [Certbot](https://github.com/certbot/certbot).

Lastly, ensuring the app runs automatically on server boot is also important. Sometimes we need reboot the server to apply the security packages. It's really convienent to make all things done with just one reboot command. I used to rely on [tmux](https://github.com/tmux/tmux), I now prefer [PM2](https://github.com/Unitech/pm2) based on ChatGPT's recommendation. It's really cool! Especially the setup is much simpler!

## Setup the server 

Here are all the commands. I'm using *example.com* for the domain part.

```bash
# install systeam dependencies on Ubuntu
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx

# install node.js and project dependencies
cat <<EOF >> ~/.bashrc

# node.js
export N_PREFIX=\$HOME/.n
export PATH=\$N_PREFIX/bin:\$PATH
EOF
. ~/.bashrc
curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n | bash -s lts
cd path/to/project/
npm i
npm run build

# install PM2 the process manager
npm install pm2 -g
pm2 start npm --name "blog" -- run start
pm2 save
pm2 startup # And run the output command
```

Next, we'll be installing [nginx](https://nginx.org/en/) to manage the SSL certificates and handle HTTPS requests. It's a common way used by many others.

```bash
# install nginx for SSL/TLS certificate
sudo sh -c 'cat <<EOF >> /etc/nginx/sites-available/example.com
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF'
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

Before proceeding with the SSL/TLS certificate installation, we need to setup the DNS on the domain provider. Typically, this involves creating an A record which host is @ and value is the server IP address. Additionally, I will add another CNAME record which host is www and value is the domain address. This will point "www.example.com" to the same IP address as "example.com".

Let's wait a few minutes for [DNS Checker](https://dnschecker.org/) to confirm that the DNS configuration is working.

```bash
# install SSL/TLS certificate
sudo certbot --nginx -d example.com -d www.example.com
```

Now let's enhance the experience by update the configuration file `/etc/nginx/sites-available/example.com`.
* Redirect `www.example.com` to `example.com`.
* Enable HTTP/2.

```bash
server {
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl http2; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}

server {
    server_name www.example.com;

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    return 301 https://example.com$request_uri;
}
```

And do not forget to reload the configuration.

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Conclusion

OK! It works now! Many of the steps above require sudo access, which is administrator access. So it's better to perform them manually for the first time. Next, we'll automate the deployment steps to ensure that the website updates automatically whenever we update the code.
