pipeline {
    agent any

    environment {
        KUSTOMIZE_BASE = 'k8s/kustomize/base'
        KUSTOMIZE_OVERLAYS_PROD = 'k8s/kustomize/overlays/production'
        ARGOCD_URL = 'http://192.168.49.2:30080'
        ARGOCD_USERNAME = 'admin'
        ARGOCD_PASSWORD = 'DtDtVi92qjPnbkIW'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Clone repository
                checkout scm
            }
        }
        
        stage('Build Kustomize Manifests') {
            steps {
                script {
                    echo "Validating base configuration..."
                    sh "kustomize build ${KUSTOMIZE_BASE}"

                    echo "Building manifests for production environment..."
                    sh "kustomize build ${KUSTOMIZE_OVERLAYS_PROD} -o production-manifest.yaml"
                }
            }
        }

        stage('Deploy to Argo CD') {
            steps {
                script {
                    echo "Logging in to Argo CD..."
                    sh "argocd login ${ARGOCD_URL} --username ${ARGOCD_USERNAME} --password ${ARGOCD_PASSWORD} --insecure"

                    echo "Creating or syncing Argo CD application..."
                    sh """
                    argocd app create my-app \
                        --repo https://github.com/your-repo/your-project.git \
                        --path ${KUSTOMIZE_OVERLAYS_PROD} \
                        --dest-server https://kubernetes.default.svc \
                        --dest-namespace production || \
                    argocd app sync my-app
                    """
                }
            }
        }
    }
}
