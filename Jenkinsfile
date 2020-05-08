node('node') {

    // ARTIFACTORY & RELATED JOBS
    def server = Artifactory.server "SERVER_ID"

    currentBuild.result = "SUCCESS"

    try {

       // CHECKING OUT FROM SOURCE VERSION CONTROL
       stage('Checkout'){

          checkout scm
       }

       // RUNNING TEST CASES ON THE APPLICATION
       stage('Test'){

         env.NODE_ENV = "test"

         print "Environment will be : ${env.NODE_ENV}"

         sh 'node -v'
         sh 'npm prune'
         sh 'npm install'
         sh 'npm test'

       }
        // RUNNING integration tests
        stage ('Integration Test') {
          steps {
            echo 'Run integration tests here...'
        }

       // CHECKING WITH SONAR-QUBE FOR VULNERABILITIES & CODE ANALYSIS
       stage 'Gradle Static Analysis'

           withSonarQubeEnv {
               sh "./gradlew clean sonarqube"

        }
      // BUILDING THE DOCKER IMAGE TO PUSH TO SERVER
       stage('Build Docker'){
            sh './dockerBuild.sh'
       }
       // PUSHING DOCKER IMAGE TO DOCKER REPO OR REMOTE SERVER OR OPEN-SHIFT / K8S
       stage('Deploy'){
         echo 'Push to Repo'
         sh './dockerPushToRepo.sh'

         echo 'ssh to web server and tell it to pull new image'
         sh 'ssh deploy@xxxxx.xxxxx.com running/xxxxxxx/dockerRun.sh'
       }
       // CLEANING UP THE WORK-DIR
       stage('Cleanup'){

         echo 'prune and cleanup'
         sh 'npm prune'
         sh 'rm node_modules -rf'

         mail body: 'project build successful',
                     from: 'xxxx@yyyyy.com',
                     replyTo: 'xxxx@yyyy.com',
                     subject: 'project build successful',
                     to: 'yyyyy@yyyy.com'
       }
    }
    catch (err) {

        currentBuild.result = "FAILURE"

            mail body: "project build error is here: ${env.BUILD_URL}" ,
            from: 'xxxx@yyyy.com',
            replyTo: 'yyyy@yyyy.com',
            subject: 'project build failed',
            to: 'zzzz@yyyyy.com'

        throw err
    }

}