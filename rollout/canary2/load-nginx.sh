#!/bin/bash
echo "2분 후부터 nginx ingress controller로 1초 간격으로 HTTP 요청 시도"
#sleep 120

nginxurl=$(kubectl get svc/ingress-nginx-controller -o json -n ingress-nginx | jq .status.loadBalancer.ingress[].hostname -r)
while true
do
    curl -s $nginxurl > /dev/null
    printf "$nginxurl 로 요청\n"
    sleep 1
done
