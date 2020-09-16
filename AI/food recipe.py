import csv
import random
import math
import pandas
import numpy
import operator
import timeit
import copy

def loadDataset(filename):
    with open(filename) as file:
        csv_data = []
        for line in file.readlines():
            csv_data.append(line.split(','))
    return csv_data

def JDistance(instance1, instance2):
    distance=0
    
    for x in range(405):
        if(int(instance1[x])==5 and int(instance2[x+2])==5):
            distance=distance-50
        elif(int(instance1[x])==5 and int(instance2[x+2])==1):
            distance=distance-10
        elif(int(instance1[x])==5 and int(instance2[x+2])==0):
            distance=distance+5
        elif(int(instance1[x])==1 and int(instance2[x+2])==5):
            distance=distance-5
        elif(int(instance1[x])==1 and int(instance2[x+2])==1):
            distance=distance-10
        elif(int(instance1[x])==1 and int(instance2[x+2])==0):
            distance=distance+1
        elif(int(instance1[x])==0 and int(instance2[x+2])==5):
            distance=distance+5
        elif(int(instance1[x])==0 and int(instance2[x+2])==1):
            distance=distance+1
                
    return distance
        
def getNeighbors(trainingSet, testInstance, k):
    distances = []
    for x in range(len(trainingSet)-1):
        dist = JDistance(testInstance, trainingSet[x+1])
        distances.append((trainingSet[x+1], dist))
    distances.sort(key=operator.itemgetter(1))
    neighbors = []

    distances = checkIngredient(distances, testInstance)

    length = len(distances)

    if(length==0):
        neighbors = []
        
    if(length<5):
        for x in range(length):
            neighbors.append((distances[x][0][0]))
    else:        
        for x in range(k):
            neighbors.append((distances[x][0][0]))
            
    return neighbors

def checkIngredient(distances, testSet):
    ingredient = []
    ingredients = []
    count=0
    ingredient = copy.deepcopy(distances)

    for x in range(len(distances)):
        for y in range(405):
            if((ingredient[x][0][y+2]==testSet[y]) and (int(testSet[y])==1)):
                count=count+1
            elif((ingredient[x][0][y+2]==testSet[y]) and (int(testSet[y])==5)):
                count=count+1
            elif((ingredient[x][0][y+2]==1 and testSet[y]==5) and (int(testSet[y])==5)):
                count=count+1
            elif((ingredient[x][0][y+2]== 5 and testSet[y]==1) and (int(testSet[y])==5)):
                count=count+1
                
        if(count>0):
            ingredients.append(distances[x])
            
        count=0
    
    return ingredients

def main():
    trainingSet = []
    testSet = []
    trainingSet = loadDataset('recipe1.csv')
    testSet = loadDataset('output.csv')
    
    k=5
    
    prediction = []
    
    for x in range(len(testSet)):
        neighbor = getNeighbors(trainingSet, testSet[x], k)
        if(len(neighbor)==0):
            print(1)
        for i in range(len(neighbor)):
            print(neighbor[i])
    
main()
