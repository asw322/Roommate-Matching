# Docker Registry README

## What is the purpose? 

The docker-registry/docker-compose.yml file is used to const a private Docker Registry. This private Docker Registry can be utilized to store any Docker Images and serves as the primary home for internal Docker images.

## How to authenticate into the Docker Registry?

plaintext password: 89Kmzg@47ci@yr6
include cert.key and cert.crt at the correct address


## How to access?

To access the docker-registry, you can pull and push images directly from the registry by utilizing:

```
# How to push a Docker Image
docker tag my-image localhost:5001/my-image
docker push localhost:5001/my-image

# How to pull a Docker Image
docker pull localhost:5001/my-image
```


## Triage docker building issue on main app:
1. ensure frontend can start via yarn start
2. triage why docker compose up is failing 
3. store the newly created docker images into docker registry
