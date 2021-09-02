# Women_CH_politics_VD

# Description of the project and context
This project is about the representativity of women in some of the main political bodies in Switzerland. It is important and interesting to have an idea of the representativity of women in Switzerland's politic bodies and its evolution in the last 50 years in a perspective of gender equity. 

Switzerland is a federal state, therefore there exists different political levels. This project will focus on the two highest levels : the Confederation and the cantons (leaving aside the communes). There is a separation of the legislative, executive and judicial powers at each level. The legislative power is represented by the parliaments and it is what this project will focus on.

# Data 
The original data comes from the Federal Statistic Office. The data contains the repartition of women and men with the total number of seats in the different executive and legislative bodies (and also the separation for each political party). This data is available from 1971 to today for each mandat of the parliament (generally 4-years, but it can vary to 3-years and 5-years). Cleaning the original data was necessary to obtain a structured file easier to use and with only the wanted data. 

For every mandat, two variables were used :the number of women and the total number of seats. They were used to calculate the percentage of women for each election. As the number of seats vary for each canton and varied through time for some cantons, I decided to calculate % instead of having absolute values showed on the graphs to avoid a misleading visualisation. 

# Choices for the visualisation and advantages

The main visualisation of the project is the graph showing the evolution of women's representation for the selected canton or federal bodies. Once the selection is done, the line will build itself from left to the right ; I found important to have something "moving" and not only the line appearing. In my opinion, to visualise an evolution through time, it is better to have something in movement rather than a static graph. Once the line is completed, the area under the line is added to help the user's perception of the % of women. 

The user can hover its mouse on the graph and the precise % of women will appear along with the year in a text box. Somethig useful is that there is no need to go on the line, the user can go anywhere on the graph and the closest point will be found and the corresponding data will show up. 

The other part of the visualisation is the sidebar on the right. It gives explanation about the visualisation and a bit of context when the page is loaded. A little animation is done to grasp the user's attention. Some information about the number of seats are displayed after the line is built with again a small animation.

This visualisation is simple but it allows to give a moving visualisation of the women's representation which, according to me, helps having a better comprehension of the evolution for the last 50 years. It also allows to grasp the user's attention in better ways. There are some simple graphs of women's representation available on the FSO website, but there are fixed which can easily "bored" a user, especially if it is not its favourite area. Moreover, this project allows to regroup this evolution for every canton and the two legislative parliaments.