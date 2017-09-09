#!/bin/bash
function terminus {
    echo "* FINISHED MONITORING @ $(date)"
}

ADDR=$1
if [ -z "$1" ]
 then
    ADDR="8.8.8.8"
fi

FILE=$2
if [ -z "$2" ]
 then
    FILE="results.txt"
fi

echo "" > $FILE

trap "terminus | tee -a $FILE" EXIT

echo "* STARTING MONITORING @ $(date)" | tee -a $FILE
echo "* PINGING $ADDR"
ping $ADDR | tee -a $FILE
