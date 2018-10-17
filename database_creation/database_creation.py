import requests
import urllib
import scrapy
import time

f = open("subsites.txt", 'r', encoding='utf8')
toVisit = [] 

for line in f:
    line = line.strip().split()
    toVisit.append(line[1])

#for city in toVisit:
#    saved = open("scrap/" + city + ".html", 'w')   
#    saved.close()
# saved = open("scrap/Warszawa.html", 'w', encoding='utf-8')
# req = urllib.request.urlopen("http://www.polskawliczbach.pl/Warszawa")
# saved.write((req.read()).decode('utf-8'))
# req.close()
# saved.close()
