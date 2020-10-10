# Dockerfileのbuild
```
docker build -t $image_name . 
```
 
# Imageをrunする
 
```
docker run --name $container_name -it -d -p 80:80 $image_name 
```

#djangoのサーバーを動かす

```
docker exec $container_name python3 manage.py runserver 0.0.0.0:80
```