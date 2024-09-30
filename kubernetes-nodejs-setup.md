# Kubernetes Setup for Node.js TypeScript API

## 1. Install kubectl and Minikube

First, install kubectl and Minikube on your local machine.

### Install kubectl:

For macOS (using Homebrew):
```bash
brew install kubectl
```

For Windows (using Chocolatey):
```bash
choco install kubernetes-cli
```

For Linux:
```bash
sudo apt-get update && sudo apt-get install -y kubectl
```

### Install Minikube:

For macOS (using Homebrew):
```bash
brew install minikube
```

For Windows (using Chocolatey):
```bash
choco install minikube
```

For Linux:
```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

## 2. Start Minikube

Start the Minikube cluster:

```bash
minikube start
```

## 3. Create Kubernetes Deployment YAML

Create a file named `deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nodejs-api
  template:
    metadata:
      labels:
        app: nodejs-api
    spec:
      containers:
      - name: nodejs-api
        image: your-docker-image:tag
        ports:
        - containerPort: 3000
        resources:
          limits:
            cpu: 500m
            memory: 512Mi
          requests:
            cpu: 200m
            memory: 256Mi
```

Replace `your-docker-image:tag` with your actual Docker image name and tag.

## 4. Create Kubernetes Service YAML

Create a file named `service.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nodejs-api-service
spec:
  selector:
    app: nodejs-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

## 5. Apply Kubernetes Configurations

Apply the Deployment and Service configurations:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

## 6. Verify Deployment

Check if the pods are running:

```bash
kubectl get pods
```

## 7. Access the API

To access your API locally, run:

```bash
minikube service nodejs-api-service
```

This will open a browser window with the exposed service URL.

## 8. Clean Up

To stop the Minikube cluster:

```bash
minikube stop
```

To delete the Minikube cluster:

```bash
minikube delete
```
