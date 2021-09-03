# Representativity of women in Switzerland's legislative bodies
You can try this visualisation on this link : https://romgotz.github.io/Women_CH_politics_VD/

# Description of the project and context
This d3 project was realised by Romain Götz in the context of Isaac Pante's "Visualisation de données" class at the University of Lausanne during the spring semeester of 2021.

This project is about the representativity of women in the main legislative bodies in Switzerland. It is important and interesting to have an idea of the representativity of women in Switzerland's politic bodies and its evolution in the last 50 years in a perspective of gender equity.

Switzerland is a federal state, therefore there exists different political levels. This project will focus on the two highest levels : the Confederation (federal level) and the cantons, therefore leaving aside the communes. There is a separation of the legislative, executive and judicial powers for each level. The legislative power is represented by the parliaments and it is on what this project will focus on.

# Data 
The original data comes from the Federal Statistic Office. The data contains the repartition of women and men with the total number of seats in the different executive and legislative bodies (and also the repartition of seats for each political party). This data is available from 1971 to today for each mandat of the parliament (generally 4-years, but it can vary to 3-years and 5-years). Cleaning the original data was necessary to obtain a structured file easier to use and with only the wanted data.
The original data files can be found :
- for the [canton level](https://www.bfs.admin.ch/bfs/fr/home/statistiques/politique/elections/femmes.assetdetail.16884142.html)
- for the [federal level](https://www.bfs.admin.ch/bfs/fr/home/statistiques/politique/elections/femmes.assetdetail.17205066.html)

As the mandat lasts for 3 to 5 years, the 1st year of the mandat was used to represent the entire mandat. Two variables were used for each mandat : the number of women and the total number of seats for each year. They were used to calculate the percentage of women for each mandat. As the number of seats vary for each canton and varied through time for some cantons, I decided to calculate % instead of having absolute values showed on the graphs to avoid a misleading visualisation. 

Finally, the data about the year of the women's right to vote and the anecdote about the Appenzell-Rhode-Interieur canton were found on the [wikipedia page](https://fr.wikipedia.org/wiki/Suffrage_f%C3%A9minin_en_Suisse#Niveau_cantonal)

# Choices for the visualisation and advantages

The main visualisation of the project is the graph showing the evolution of women's pourcentage for the selected canton or federal bodies. Once the selection is done, the line builds itself from left to the right. In my opinion, to better visualise an evolution through time, it is necessary to have something in movement rather than a static graph. Once the line is completed, the area under the line is added to help the user's perception of the % of women and the existing gap to 50% to reach equity. 

The user can also hover its mouse on the graph and the precise % of women will appear along with the year in a text box. Somethig useful is that there is no need to go on the line, the user can go anywhere on the graph and the closest point will be found and the corresponding data will show up. 

The other part of the visualisation is the sidebar on the right. It gives explanation about the visualisation and a small context when the page is loaded. In order to grasp the user's attention, a little animation is done. When a canton is selected and after the line has been built, some information about the canton are displayed with the same small animation to indicate something new has appeared.

This visualisation is simple but it allows to give a moving visualisation of the women's representation which, according to me, helps having a better comprehension of the evolution for the last 50 years. There are some simple graphs of women's representation available on the FSO website, but there are fixed which can easily "bored" a user, especially if it is not its favourite area. Moreover, this project allows to regroup the evolution for every canton and the two legislative parliaments in a single visualisaton which does not exist on the FSO site.  
