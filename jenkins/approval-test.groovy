pipeline {
  agent any
  stages {
    stage('빌드 승인') {
      input {
        message '빌드를 진행할까요? (Y/N)'
        ok 'Build'
        submitter 'PM, TL'
        parameters {
           string(name:'CONTINUE', defaultValue:'Y', description:'빌드를 진행할지 Y/N으로 입력후 Build 버튼을 클릭합니다')
        }
      }
      steps {
          echo "빌드 진행 : ${CONTINUE}"
      }
    }
  }
}