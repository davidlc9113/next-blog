# How to use Github Actions to automate deployment

I really love using CI/CD to automate tasks such as testing and deployment. All we have to do is push the code, and our website is automatically updated! Before that, we need to add a config file. It's easy and simple, so it should not cost us much time.

Usually, we have two options to run the deployment code:
* The first is to SSH to our server using the free GitHub-hosted runners.
* The second is to host the runner on our server.

Both options have security concerns for me, but the first one is simpler. So, I will use SSH this time. A common SSH action is [https://github.com/appleboy/ssh-action](https://github.com/appleboy/ssh-action). 

The sensitive data is encrypted in [Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions). It can be accessed by the `secrets` context. Here is the final config `.github/workflows/.deploy.yml`.

```yaml
name: Deploy to EC2

on:
  push:
    branches:
      - main
    paths:
      - _data/**

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: SSH Remote Commands
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_KEY }}
          port: ${{ secrets.EC2_PORT }}
          script_stop: true
          script: |
            cd ~/next-blog
            git pull --rebase
            export N_PREFIX=$HOME/.n
            export PATH=$N_PREFIX/bin:$PATH
            npm ci
            npm run build
            npm test --if-present
            pm2 restart all --silent
```

I ran out of memory when executing the `npm ci` command. It's strange because it did not happen when I ran it manually. Anyway, I added swap space to fix it.

```bash
sudo /bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=1024
sudo chmod 600 /var/swap.1
sudo /sbin/mkswap /var/swap.1
sudo /sbin/swapon /var/swap.1
```

That's it! Really simple to configure, right? Enjoy the automated deployment and happy coding!

