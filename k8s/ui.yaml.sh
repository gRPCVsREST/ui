#!/bin/bash
cat <<YAML
apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: ui
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: ui
    spec:
      containers:
        - name: ui
          image: gcr.io/alien-fold-180922/ui:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 3000
          env:
            - name: rest_aggregator_url
              value: "http://rest-aggregator-service:8080"
            - name: grpc_aggregator_host
              value: "grpc-aggregator-service"
            - name: grpc_aggregator_port
              value: "8080"
            - name: temp
              value: "$(date +%s)"
---
apiVersion: v1
kind: Service
metadata:
  name: ui
spec:
  type: LoadBalancer
  selector:
    app: ui
  ports:
   - port: 80
     targetPort: 3000
     protocol: TCP
---
YAML
