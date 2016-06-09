# Echolon Project API

This repo will serve as the standard development boilerplate / framework / starting ground for all future Backend APIs of Elementz Web Development projects.

## OSX: Local Development Setup

First, you will need to have a working Docker Machine setup on your local machine. You will also need a mechanism for rsync-ing files into the Docker Machine.

### Dependencies

#### Get Docker Toolbox

Head on over to https://www.docker.com/docker-toolbox and download the latest version of Docker Toolbox. This will install Virtualbox and the command line tools `docker-machine` and `docker-compose`

#### Rsync

We use rsync to sync code from your local machine into the docker machine for use by Docker. This allows native support for file system watchers inside the container.

The code in this repo should be sync'd to the `/projects/echolon-project` folder inside the docker machine.

For OS-X users, you can easily use the `docker-rsync` tool to automate this for you. There is also a provided make command `make sync` in this repo to make this easy.

##### Install docker-rsync

docker-rsync is installed via the Brew package manager for OS X.

1. `brew update`
2. `brew tap synack/docker`
3. `brew install docker-rsync`

### Setting up your Docker Host

Use Docker Machine to setup a docker host. This projects expects your Docker Machine to be named `default`.

Run the following commands to setup this Docker Machine

```bash
docker-machine create -d virtualbox default
```

Docker will need certain env vars to be set so the docker client know how to communicate with this docker machine.

Run the following in each shell where a docker command will be run to make sure that docker communicates with the right machine:

```bash
eval "$(docker-machine env default)"
```

It can be handy to add the following lines to your shell profile to make sure that with each shell you Docker Machine is running, and the proper env vars are set:

```bash
docker-machine start default
eval "$(docker-machine env default)"
```

### Setup host file alias to point to the docker machine

Find out the IP of the docker machine by running:

```bash
docker-machine ip default
```

Put the following entry in your `/etc/hosts` file:

```
<machine_ip> docker.local
```

### Starting Application

Once you have completed the installation of the dependencies above. You are ready to setup the cluster.

1. Pull down repo
2. Inside the project folder, run `ln -s ./envs/.envvars.local .envvars`
2. Run `make build`
3. Run `make sync` (in one tab)
4. Open a new tab in Terminal and run `make up`

## Linux: Local Development Setup

Since Linux supports docker nativly, the setup is much easier.

### Install Docker and Docker Compose

You can follow this tutorial to make sure they are both installed:

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-14-04

**NOTE:** Make sure you restart your machine after install.

### Starting Application

Once you have completed the installation of the dependencies above. You are ready to setup the cluster.

1. Pull down repo to `~/Workspace/projects/echolon-project`

    `git clone git@github.com:harice/echolon-project.git ~/Workspace/projects/echolon-project`

2. Create a symlink to be used as a volume, and maintain compatibility with your OS X friends

    `ln -s ~/Workspace/projects /projects`

3. `cd ~/Workspace/projects/echolon-project`
4. `ln -s ./envs/.envvars.local .envvars`
5. `make build`
6. `make up`
