def IMAGE_VERSION = '1.0.0'
pipeline {
	agent any
	stages {
        stage("###Checkout") {
            steps {
                checkout scm
            }
        }
        stage('###Docker Build') {
            agent any
            steps {
                script {
                    echo "${env.IMAGE_REPO}:${IMAGE_VERSION}"
                    app = docker.build("${env.IMAGE_REPO}")
                }
            }
        }
        stage('###Push Image') {
            agent any
            steps {
                script {
                    docker.withRegistry("https://registry.hub.docker.com/${env.IMAGE_REPO}", "dockerhub-credentials") {            
                        app.push(IMAGE_VERSION)
                        app.push("latest")
                    }
                }
            }
        }
    }
}
