# banking_credit_conveyor

build an image from the dockerfile with a command
```
docker build -t eeershov/banking_credit_conveyor:1.0 .
```

run docker 

where local port `5000` : container port `3001`
```
docker run -p 5000:3001 eeershov/banking_credit_conveyor:1.0
