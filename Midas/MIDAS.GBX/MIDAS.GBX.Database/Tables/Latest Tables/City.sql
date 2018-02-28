CREATE TABLE [dbo].[City]
(
	[Id] [TINYINT] NOT NULL,
	[StateCode] [NVARCHAR](2) NOT NULL,
	[CityText] [NVARCHAR](50) NOT NULL,
	[IsDeleted] [BIT] NULL,
	--[CreateByUserID] [INT] NOT NULL,
	--[CreateDate] [DATETIME2](7) NOT NULL,
	--[UpdateByUserID] [INT] NULL,
	--[UpdateDate] [DATETIME2](7) NULL,
	CONSTRAINT [UK_State_City] UNIQUE ([StateCode], [CityText]),
    CONSTRAINT [PK_City] PRIMARY KEY ([Id])
)
GO

ALTER TABLE [dbo].[City]  WITH CHECK ADD  CONSTRAINT [FK_City_StateCode] FOREIGN KEY([StateCode])
REFERENCES [dbo].[State] ([StateCode])
GO

ALTER TABLE [dbo].[City] CHECK CONSTRAINT [FK_City_StateCode]
GO


/*
INSERT INTO [dbo].[City] ([Id], [StateCode], [CityText])
	VALUES (1, 'AL', 'Alexander City'),(2, 'AL', 'Andalusia'),(3, 'AL', 'Anniston'),(4, 'AL', 'Athens'),(5, 'AL', 'Atmore'),(6, 'AL', 'Auburn'),(7, 'AL', 'Bessemer')
	       ,(8, 'AL', 'Birmingham'),(9, 'AL', 'Chickasaw'),(10, 'AL', 'Clanton'),(11, 'AL', 'Cullman'),(12, 'AL', 'Decatur'),(13, 'AL', 'Demopolis'),(14, 'AL', 'Dothan'),(15, 'AL', 'Enterprise')
		   ,(16, 'AL', 'Eufaula'),(17, 'AL', 'Florence'),(18, 'AL', 'Fort Payne'),(19, 'AL', 'Gadsden'),(20, 'AL', 'Greenville'),(21, 'AL', 'Guntersville'),(22, 'AL', 'Huntsville'),(23, 'AL', 'Jasper')
		   ,(24, 'AL', 'Marion'),(25, 'AL', 'Mobile'),(26, 'AL', 'Montgomery'),(27, 'AL', 'Opelika'),(28, 'AL', 'Ozark'),(29, 'AL', 'Phenix City'),(30, 'AL', 'Prichard'),(31, 'AL', 'Scottsboro')
	       ,(32, 'AL', 'Selma'),(33, 'AL', 'Sheffield'),(34, 'AL', 'Sylacauga'),(35, 'AL', 'Talladega'),(36, 'AL', 'Troy'),(37, 'AL', 'Tuscaloosa'),(38, 'AL', 'Tuscumbia'),(39, 'AL', 'Tuskegee')

		   ,(40, 'AK', 'Anchorage'),(41, 'AK', 'Cordova'),(42, 'AK', 'Fairbanks'),(43, 'AK', 'Haines'),(44, 'AK', 'Homer'),(45, 'AK', 'Juneau'),(46, 'AK', 'Ketchikan'),(47, 'AK', 'Kodiak')
		   ,(48, 'AK', 'Kotzebue'),(49, 'AK', 'Nome'),(50, 'AK', 'Palmer'),(51, 'AK', 'Seward'),(52, 'AK', 'Sitka'),(53, 'AK', 'Skagway'),(54, 'AK', 'Valdez')
	      
		    ,(55, 'AZ', 'Ajo'),(56, 'AZ', 'Avondale'),(57, 'AZ', 'Bisbee'),(58, 'AZ', 'Casa Grande'),(59, 'AZ', 'Chandler'),(60, 'AZ', 'Clifton'),(61, 'AZ', 'Douglas'),(62, 'AZ', 'Flagstaff')
		   ,(63, 'AZ', 'Florence'),(64, 'AZ', 'Gila Bend'),(65, 'AZ', 'Glendale'),(66, 'AZ', 'Globe'),(67, 'AZ', 'Kingman'),(68, 'AZ', 'Lake Havasu City'),(69, 'AZ', 'Mesa'),(70, 'AZ', 'Nogales')
		   ,(71, 'AZ', 'Oraibi'),(72, 'AZ', 'Phoenix'),(73, 'AZ', 'Prescott'),(74, 'AZ', 'Scottsdale'),(75, 'AZ', 'Sierra Vista'),(80, 'AZ', 'Tempe'),(81, 'AZ', 'Tombstone'),(82, 'AZ', 'Tucson')
	       ,(83, 'AZ', 'Walpi'),(84, 'AZ', 'Window Rock'),(85, 'AZ', 'Winslow'),(86, 'AZ', 'Yuma')


		   ,('87','AR','Arkadelphia'),('88','AR','Arkansas Post'),('89','AR','Batesville'),('90','AR','Benton'),('91','AR','Blytheville'),('92','AR','Camden'),('93','AR','Conway'),('94','AR','Crossett')
           ,('95','AR','El Dorado'),('96','AR','Fayetteville'),('97','AR','Forrest City'),('98','AR','Fort Smith'),('99','AR','Harrison'),('100','AR','Helena'),('101','AR','Hope'),('102','AR','Hot Springs')
           ,('103','AR','Jacksonville'),('104','AR','Jonesboro'),('105','AR','Little Rock'),('106','AR','Magnolia'),('107','AR','Morrilton'),('108','AR','Newport'),('109','AR','North Little Rock'),('110','AR','Osceola')
           ,('111','AR','Pine Bluff'),('112','AR','Rogers'),('113','AR','Searcy'),('114','AR','Stuttgart'),('115','AR','Van Buren'),('116','AR','West Memphis')


		   ,('117','CA','Alameda'),('118','CA','Alhambra'),('119','CA','Anaheim'),('120','CA','Antioch'),('121','CA','Arcadia'),('122','CA','Bakersfield'),('123','CA','Barstow'),('124','CA','Belmont')
          ,('125','CA','Berkeley'),('126','CA','Beverly Hills'),('127','CA','Brea'),('128','CA','Buena Park'),('129','CA','Burbank'),('130','CA','Calexico'),('131','CA','Calistoga'),('132','CA','Carlsbad')
           ,('133','CA','Carmel'),('134','CA','Chico'),('135','CA','Chula Vista'),('136','CA','Claremont'),('137','CA','Compton'),('138','CA','Concord'),('139','CA','Corona'),('140','CA','Coronado')
          ,('141','CA','Costa Mesa'),('142','CA','Culver City'),('143','CA','Daly City'),('144','CA','Davis'),('145','CA','Downey'),('146','CA','El Centro'),('147','CA','El Cerrito'),('148','CA','El Monte')
          ,('149','CA','Escondido'),('150','CA','Eureka'),('151','CA','Fairfield'),('152','CA','Fontana'),('153','CA','Fremont'),('154','CA','Fresno'),('155','CA','Fullerton'),('156','CA','Garden Grove')
          ,('157','CA','Glendale'),('158','CA','Hayward'),('159','CA','Hollywood'),('160','CA','Huntington Beach'),('161','CA','Indio'),('162','CA','Inglewood'),('163','CA','Irvine'),('164','CA','La Habra')
          ,('165','CA','Laguna Beach'),('166','CA','Lancaster'),('167','CA','Livermore'),('168','CA','Lodi'),('169','CA','Lompoc'),('170','CA','Long Beach'),('171','CA','Los Angeles'),('172','CA','Malibu')
          ,('173','CA','Martinez'),('174','CA','Marysville'),('175','CA','Menlo Park'),('176','CA','Merced'),('177','CA','Modesto'),('178','CA','Monterey'),('179','CA','Mountain View'),('180','CA','Napa')
          ,('181','CA','Needles'),('182','CA','Newport Beach'),('183','CA','Norwalk'),('184','CA','Novato'),('185','CA','Oakland'),('186','CA','Oceanside'),('187','CA','Ojai'),('188','CA','Ontario')
          ,('189','CA','Orange'),('190','CA','Oroville'),('191','CA','Oxnard'),('192','CA','Pacific Grove'),('193','CA','Palm Springs'),('194','CA','Palmdale'),('195','CA','Palo Alto'),('196','CA','Pasadena')
          ,('197','CA','Petaluma'),('198','CA','Pomona'),('199','CA','Port Hueneme'),('200','CA','Rancho Cucamonga'),('201','CA','Red Bluff'),('202','CA','Redding'),('203','CA','Redlands'),('204','CA','Redondo Beach')
          ,('205','CA','Redwood City'),('206','CA','Richmond'),('207','CA','Riverside'),('208','CA','Roseville'),('209','CA','Sacramento'),('210','CA','Salinas'),('211','CA','San Bernardino'),('212','CA','San Clemente')
          ,('213','CA','San Diego'),('214','CA','San Fernando'),('215','CA','San Francisco'),('216','CA','San Gabriel'),('217','CA','San Jose'),('218','CA','San Juan Capistrano'),('219','CA','San Leandro'),('220','CA','San Luis Obispo')
          ,('221','CA','San Marino'),('222','CA','San Mateo'),('223','CA','San Pedro'),('224','CA','San Rafael'),('225','CA','San Simeon'),('226','CA','Santa Ana'),('227','CA','Santa Barbara'),('228','CA','Santa Clara')
           ,('229','CA','Santa Clarita'),('230','CA','Santa Cruz'),('231','CA','Santa Monica'),('232','CA','Santa Rosa'),('233','CA','Sausalito'),('234','CA','Simi Valley'),('235','CA','Sonoma'),('236','CA','South San Francisco')
         ,('237','CA','Stockton'),('238','CA','Sunnyvale'),('239','CA','Susanville'),('240','CA','Thousand Oaks'),('241','CA','Torrance'),('242','CA','Turlock'),('243','CA','Ukiah'),('244','CA','Vallejo')
         ,('245','CA','Ventura'),('246','CA','Victorville'),('247','CA','Visalia'),('248','CA','Walnut Creek'),('249','CA','Watts'),('250','CA','West Covina'),('251','CA','Whittier'),('252','CA','Woodland')
         ,('253','CA','Yorba Linda'),('254','CA','Yuba City')


		 ,('255','CO','Alamosa'),('256','CO','Aspen'),('257','CO','Aurora'),('258','CO','Boulder'),('259','CO','Breckenridge'),('260','CO','Brighton'),('261','CO','Canon City'),('262','CO','Central City')
        ,('263','CO','Climax'),('264','CO','Colorado Springs'),('265','CO','Cortez'),('266','CO','Cripple Creek'),('267','CO','Denver'),('268','CO','Durango'),('269','CO','Englewood'),('270','CO','Estes Park')
        ,('271','CO','Fort Collins'),('272','CO','Fort Morgan'),('273','CO','Georgetown'),('274','CO','Glenwood Springs'),('275','CO','Golden'),('276','CO','Grand Junction'),('277','CO','Greeley'),('278','CO','Gunnison')
        ,('279','CO','La Junta'),('280','CO','Leadville'),('281','CO','Littleton'),('282','CO','Longmont'),('283','CO','Loveland'),('284','CO','Montrose'),('285','CO','Ouray'),('286','CO','Pagosa Springs')
        ,('287','CO','Pueblo'),('288','CO','Silverton'),('289','CO','Steamboat Springs'),('290','CO','Sterling'),('291','CO','Telluride'),('292','CO','Trinidad'),('293','CO','Vail'),('294','CO','Walsenburg')
        ,('295','CO','Westminster')



		,('296','CT','Ansonia'),('297','CT','Berlin'),('298','CT','Bloomfield'),('299','CT','Branford'),('300','CT','Bridgeport'),('301','CT','Bristol'),('302','CT','Coventry'),('303','CT','Danbury')
        ,('304','CT','Darien'),('305','CT','Derby'),('306','CT','East Hartford'),('307','CT','East Haven'),('308','CT','Enfield'),('309','CT','Fairfield'),('310','CT','Farmington'),('311','CT','Greenwich')
        ,('312','CT','Groton'),('313','CT','Guilford'),('314','CT','Hamden'),('315','CT','Hartford'),('316','CT','Lebanon'),('317','CT','Litchfield'),('318','CT','Manchester'),('319','CT','Mansfield')
        ,('320','CT','Meriden'),('321','CT','Middletown'),('322','CT','Milford'),('323','CT','Mystic'),('324','CT','Naugatuck'),('325','CT','New Britain'),('326','CT','New Haven'),('327','CT','New London')
        ,('328','CT','North Haven'),('329','CT','Norwalk'),('330','CT','Norwich'),('331','CT','Old Saybrook'),('332','CT','Orange'),('333','CT','Seymour'),('334','CT','Shelton'),('335','CT','Simsbury')
        ,('336','CT','Southington'),('337','CT','Stamford'),('338','CT','Stonington'),('339','CT','Stratford'),('340','CT','Torrington'),('341','CT','Wallingford'),('342','CT','Waterbury'),('343','CT','Waterford')
        ,('344','CT','Watertown'),('345','CT','West Hartford'),('346','CT','West Haven'),('347','CT','Westport'),('348','CT','Wethersfield'),('349','CT','Willimantic'),('350','CT','Windham'),('351','CT','Windsor')
        ,('352','CT','Windsor Locks'),('353','CT','Winsted')


		,('354','DE',' Dover'),('355','DE','Lewes'),('356','DE','Milford'),('357','DE','New Castle'),('358','DE','Newark'),('359','DE','Smyrna'),('360','DE','Wilmington')


		,('361','FL','Apalachicola'),('362','FL','Bartow'),('363','FL','Belle Glade'),('364','FL','Boca Raton'),('365','FL','Bradenton'),('366','FL','Cape Coral'),('367','FL','Clearwater'),('368','FL','Cocoa Beach')
        ,('369','FL','Cocoa - Rockledge'),('370','FL','Coral Gables'),('371','FL','Daytona Beach'),('372','FL','De Land'),('373','FL','Deerfield Beach'),('374','FL','Delray Beach'),('375','FL','Fernandina Beach'),('376','FL','Fort Lauderdale')
        ,('377','FL','Fort Myers'),('378','FL','Fort Pierce'),('379','FL','Fort Walton Beach'),('380','FL','Gainesville'),('381','FL','Hallandale Beach'),('382','FL','Hialeah'),('383','FL','Hollywood'),('384','FL','Homestead')
        ,('385','FL','Jacksonville'),('386','FL','Key West'),('387','FL','Lake City'),('388','FL','Lake Wales'),('389','FL','Lakeland'),('390','FL','Largo'),('391','FL','Melbourne'),('392','FL','Miami')
        ,('393','FL','Miami Beach'),('394','FL','Naples'),('395','FL','New Smyrna Beach'),('396','FL','Ocala'),('397','FL','Orlando'),('398','FL','Ormond Beach'),('399','FL','Palatka'),('400','FL','Palm Bay')
        ,('401','FL','Palm Beach'),('402','FL','Panama City'),('403','FL','Pensacola'),('404','FL','Pompano Beach'),('405','FL','Saint Augustine'),('406','FL','Saint Petersburg'),('407','FL','Sanford'),('408','FL','Sarasota')
        ,('409','FL','Sebring'),('410','FL','Tallahassee'),('411','FL','Tampa'),('412','FL','Tarpon Springs'),('413','FL','Titusville'),('414','FL','Venice'),('415','FL','West Palm Beach'),('416','FL','White Springs')
        ,('417','FL','Winter Haven'),('418','FL','Winter Park')

		,('419','GA','Albany'),('420','GA','Americus'),('421','GA','Andersonville'),('422','GA','Athens'),('423','GA','Atlanta'),('424','GA','Augusta'),('425','GA','Bainbridge'),('426','GA','Blairsville')
        ,('427','GA','Brunswick'),('428','GA','Calhoun'),('429','GA','Carrollton'),('430','GA','Columbus'),('431','GA','Dahlonega'),('432','GA','Dalton'),('433','GA','Darien'),('434','GA','Decatur')
        ,('435','GA','Douglas'),('436','GA','East Point'),('437','GA','Fitzgerald'),('438','GA','Fort Valley'),('439','GA','Gainesville'),('440','GA','La Grange'),('441','GA','Macon'),('442','GA','Marietta')
        ,('443','GA','Milledgeville'),('444','GA','Plains'),('445','GA','Rome'),('446','GA','Savannah'),('447','GA','Toccoa'),('448','GA','Valdosta'),('449','GA','Warm Springs'),('450','GA','Warner Robins')
        ,('451','GA','Washington'),('452','GA','Waycross')

		,('453','HI','Hanalei'),('454','HI','Hilo'),('455','HI','Honaunau'),('456','HI','Honolulu'),('457','HI','Kahului'),('458','HI','Kaneohe'),('459','HI','Kapaa'),('460','HI','Kawaihae')
        ,('461','HI','Lahaina'),('462','HI','Laie'),('463','HI','Wahiawa'),('464','HI','Wailuku'),('465','HI','Waimea')

		,('466','ID','Blackfoot'),('467','ID','Boise'),('468','ID','Bonners Ferry'),('469','ID','Caldwell'),('470','ID','Coeur d'Alene'),('471','ID','Idaho City'),('472','ID','Idaho Falls'),('473','ID','Kellogg')
        ,('474','ID','Lewiston'),('475','ID','Moscow'),('476','ID','Nampa'),('477','ID','Pocatello'),('478','ID','Priest River'),('479','ID','Rexburg'),('480','ID','Sun Valley'),('481','ID','Twin Falls')


		,('482','IL','Alton'),('483','IL','Arlington Heights'),('484','IL','Arthur'),('485','IL','Aurora'),('486','IL','Belleville'),('487','IL','Belvidere'),('488','IL','Bloomington'),('489','IL','Brookfield')
        ,('490','IL','Cahokia'),('491','IL','Cairo'),('492','IL','Calumet City'),('493','IL','Canton'),('494','IL','Carbondale'),('495','IL','Carlinville'),('496','IL','Carthage'),('497','IL','Centralia')
        ,('498','IL','Champaign'),('499','IL','Charleston'),('500','IL','Chester'),('501','IL','Chicago'),('502','IL','Chicago Heights'),('503','IL','Cicero'),('504','IL','Collinsville'),('505','IL','Danville')
        ,('506','IL','Decatur'),('507','IL','DeKalb'),('508','IL','Des Plaines'),('509','IL','Dixon'),('510','IL','East Moline'),('511','IL','East Saint Louis'),('512','IL','Effingham'),('513','IL','Elgin')
        ,('514','IL','Elmhurst'),('515','IL','Evanston'),('516','IL','Freeport'),('517','IL','Galena'),('518','IL','Galesburg'),('519','IL','Glen Ellyn'),('520','IL','Glenview'),('521','IL','Granite City')
        ,('522','IL','Harrisburg'),('523','IL','Herrin'),('524','IL','Highland Park'),('525','IL','Jacksonville'),('526','IL','Joliet'),('527','IL','Kankakee'),('528','IL','Kaskaskia'),('529','IL','Kewanee')
        ,('530','IL','La Salle'),('531','IL','Lake Forest'),('532','IL','Libertyville'),('533','IL','Lincoln'),('534','IL','Lisle'),('535','IL','Lombard'),('536','IL','Macomb'),('537','IL','Mattoon')
        ,('538','IL','Moline'),('539','IL','Monmouth'),('540','IL','Mount Vernon'),('541','IL','Mundelein'),('542','IL','Naperville'),('543','IL','Nauvoo'),('544','IL','Normal'),('545','IL','North Chicago')
        ,('546','IL','Oak Park'),('547','IL','Oregon'),('548','IL','Ottawa'),('549','IL','Palatine'),('550','IL','Park Forest'),('551','IL','Park Ridge'),('552','IL','Pekin'),('553','IL','Peoria')
        ,('554','IL','Petersburg'),('555','IL','Pontiac'),('556','IL','Quincy'),('557','IL','Rantoul'),('558','IL','River Forest'),('559','IL','Rock Island'),('560','IL','Rockford'),('561','IL','Salem')
        ,('562','IL','Shawneetown'),('563','IL','Skokie'),('564','IL','South Holland'),('565','IL','Springfield'),('566','IL','Streator'),('567','IL','Summit'),('568','IL','Urbana'),('569','IL','Vandalia')
        ,('570','IL','Virden'),('571','IL','Waukegan'),('572','IL','Wheaton'),('573','IL','Wilmette'),('574','IL','Winnetka'),('575','IL','Wood River'),('576','IL','Zion')


		,('577','IN','Anderson'),('578','IN','Bedford'),('579','IN','Bloomington'),('580','IN','Columbus'),('581','IN','Connersville'),('582','IN','Corydon'),('583','IN','Crawfordsville'),('584','IN','East Chicago')
        ,('585','IN','Elkhart'),('586','IN','Elwood'),('587','IN','Evansville'),('588','IN','Fort Wayne'),('589','IN','French Lick'),('590','IN','Gary'),('591','IN','Geneva'),('592','IN','Goshen')
        ,('593','IN','Greenfield'),('594','IN','Hammond'),('595','IN','Hobart'),('596','IN','Huntington'),('597','IN','Indianapolis'),('598','IN','Jeffersonville'),('599','IN','Kokomo'),('600','IN','Lafayette')
        ,('601','IN','Madison'),('602','IN','Marion'),('603','IN','Michigan City'),('604','IN','Mishawaka'),('605','IN','Muncie'),('606','IN','Nappanee'),('607','IN','Nashville'),('608','IN','New Albany')
        ,('609','IN','New Castle'),('610','IN','New Harmony'),('611','IN','Peru'),('612','IN','Plymouth'),('613','IN','Richmond'),('614','IN','Santa Claus'),('615','IN','Shelbyville'),('616','IN','South Bend')
        ,('617','IN','Terre Haute'),('618','IN','Valparaiso'),('619','IN','Vincennes'),('620','IN','Wabash'),('621','IN','West Lafayette')


		,('622','IA','Amana Colonies'),('623','IA','Ames'),('624','IA','Boone'),('625','IA','Burlington'),('626','IA','Cedar Falls'),('627','IA','Cedar Rapids'),('628','IA','Charles City'),('629','IA','Cherokee')
        ,('630','IA','Clinton'),('631','IA','Council Bluffs'),('632','IA','Davenport'),('633','IA','Des Moines'),('634','IA','Dubuque'),('635','IA','Estherville'),('636','IA','Fairfield'),('637','IA','Fort Dodge')
        ,('638','IA','Grinnell'),('639','IA','Indianola'),('640','IA','Iowa City'),('641','IA','Keokuk'),('642','IA','Mason City'),('643','IA','Mount Pleasant'),('644','IA','Muscatine'),('645','IA','Newton')
        ,('646','IA','Oskaloosa'),('647','IA','Ottumwa'),('648','IA','Sioux City'),('649','IA','Waterloo'),('650','IA','Webster City'),('651','IA','West Des Moines')


		,('652','KS','Abilene'),('653','KS','Arkansas City'),('654','KS','Atchison'),('655','KS','Chanute'),('656','KS','Coffeyville'),('657','KS','Council Grove'),('658','KS','Dodge City'),('659','KS','Emporia')
        ,('660','KS','Fort Scott'),('661','KS','Garden City'),('662','KS','Great Bend'),('663','KS','Hays'),('664','KS','Hutchinson'),('665','KS','Independence'),('666','KS','Junction City'),('667','KS','Kansas City')
        ,('668','KS','Lawrence'),('669','KS','Leavenworth'),('670','KS','Liberal'),('671','KS','Manhattan'),('672','KS','McPherson'),('673','KS','Medicine Lodge'),('674','KS','Newton'),('675','KS','Olathe')
        ,('676','KS','Osawatomie'),('677','KS','Ottawa'),('678','KS','Overland Park'),('679','KS','Pittsburg'),('680','KS','Salina'),('681','KS','Shawnee'),('682','KS','Smith Center'),('683','KS','Topeka')
        ,('684','KS','Wichita')

		,('685','KY','Ashland'),('686','KY','Barbourville'),('687','KY','Bardstown'),('688','KY','Berea'),('689','KY','Boonesborough'),('690','KY','Bowling Green'),('691','KY','Campbellsville'),('692','KY','Covington')
        ,('693','KY','Danville'),('694','KY','Elizabethtown'),('695','KY','Frankfort'),('696','KY','Harlan'),('697','KY','Harrodsburg'),('698','KY','Hazard'),('699','KY','Henderson'),('700','KY','Hodgenville')
        ,('701','KY','Hopkinsville'),('702','KY','Lexington'),('703','KY','Louisville'),('704','KY','Mayfield'),('705','KY','Maysville'),('706','KY','Middlesboro'),('707','KY','Newport'),('708','KY','Owensboro')
        ,('709','KY','Paducah'),('710','KY','Paris'),('711','KY','Richmond')

		,('712','LA','Abbeville'),('713','LA','Alexandria'),('714','LA','Bastrop'),('715','LA','Baton Rouge'),('716','LA','Bogalusa'),('717','LA','Bossier City'),('718','LA','Gretna'),('719','LA','Houma')
        ,('720','LA','Lafayette'),('721','LA','Lake Charles'),('722','LA','Monroe'),('723','LA','Morgan City'),('724','LA','Natchitoches'),('725','LA','New Iberia'),('726','LA','New Orleans'),('727','LA','Opelousas')
        ,('728','LA','Ruston'),('729','LA','Saint Martinville'),('730','LA','Shreveport'),('731','LA','Thibodaux')


		,('732','ME','Auburn'),('733','ME','Augusta'),('734','ME','Bangor'),('735','ME','Bar Harbor'),('736','ME','Bath'),('737','ME','Belfast'),('738','ME','Biddeford'),('739','ME','Boothbay Harbor')
        ,('740','ME','Brunswick'),('741','ME','Calais'),('742','ME','Caribou'),('743','ME','Castine'),('744','ME','Eastport'),('745','ME','Ellsworth'),('746','ME','Farmington'),('747','ME','Fort Kent')
        ,('748','ME','Gardiner'),('749','ME','Houlton'),('750','ME','Kennebunkport'),('751','ME','Kittery'),('752','ME','Lewiston'),('753','ME','Lubec'),('754','ME','Machias'),('755','ME','Orono')
        ,('756','ME','Portland'),('757','ME','Presque Isle'),('758','ME','Rockland'),('759','ME','Rumford'),('760','ME','Saco'),('761','ME','Scarborough'),('762','ME','Waterville'),('763','ME','York')


		,('764','MD','Aberdeen'),('765','MD','Annapolis'),('766','MD','Baltimore'),('767','MD','Bethesda - Chevy Chase'),('768','MD','Bowie'),('769','MD','Cambridge'),('770','MD','Catonsville'),('771','MD','College Park')
        ,('772','MD','Columbia'),('773','MD','Cumberland'),('774','MD','Easton'),('775','MD','Elkton'),('776','MD','Emmitsburg'),('777','MD','Frederick'),('778','MD','Greenbelt'),('779','MD','Hagerstown')
        ,('780','MD','Hyattsville'),('781','MD','Laurel'),('782','MD','Oakland'),('783','MD','Ocean City'),('784','MD','Rockville'),('785','MD','Saint Marys City'),('786','MD','Salisbury'),('787','MD','Silver Spring')
        ,('788','MD','Takoma Park'),('789','MD','Towson'),('790','MD','Westminster')

		,('791','MA','Abington'),('792','MA','Adams'),('793','MA','Amesbury'),('794','MA','Amherst'),('795','MA','Andover'),('796','MA','Arlington'),('797','MA','Athol'),('798','MA','Attleboro')
        ,('799','MA','Barnstable'),('800','MA','Bedford'),('801','MA','Beverly'),('802','MA','Boston'),('803','MA','Bourne'),('804','MA','Braintree'),('805','MA','Brockton'),('806','MA','Brookline')
        ,('807','MA','Cambridge'),('808','MA','Canton'),('809','MA','Charlestown'),('810','MA','Chelmsford'),('811','MA','Chelsea'),('812','MA','Chicopee'),('813','MA','Clinton'),('814','MA','Cohasset')
        ,('815','MA','Concord'),('816','MA','Danvers'),('817','MA','Dartmouth'),('818','MA','Dedham'),('819','MA','Dennis'),('820','MA','Duxbury'),('821','MA','Eastham'),('822','MA','Edgartown')
        ,('823','MA','Everett'),('824','MA','Fairhaven'),('825','MA','Fall River'),('826','MA','Falmouth'),('827','MA','Fitchburg'),('828','MA','Framingham'),('829','MA','Gloucester'),('830','MA','Great Barrington')
        ,('831','MA','Greenfield'),('832','MA','Groton'),('833','MA','Harwich'),('834','MA','Haverhill'),('835','MA','Hingham'),('836','MA','Holyoke'),('837','MA','Hyannis'),('838','MA','Ipswich')
        ,('839','MA','Lawrence'),('840','MA','Lenox'),('841','MA','Leominster'),('842','MA','Lexington'),('843','MA','Lowell'),('844','MA','Ludlow'),('845','MA','Lynn'),('846','MA','Malden')
        ,('847','MA','Marblehead'),('848','MA','Marlborough'),('849','MA','Medford'),('850','MA','Milton'),('851','MA','Nahant'),('852','MA','Natick'),('853','MA','New Bedford'),('854','MA','Newburyport')
        ,('855','MA','Newton'),('856','MA','North Adams'),('857','MA','Northampton'),('858','MA','Norton'),('859','MA','Norwood'),('860','MA','Peabody'),('861','MA','Pittsfield'),('862','MA','Plymouth')
        ,('863','MA','Provincetown'),('864','MA','Quincy'),('865','MA','Randolph'),('866','MA','Revere'),('867','MA','Salem'),('868','MA','Sandwich'),('869','MA','Saugus'),('870','MA','Somerville')
        ,('871','MA','South Hadley'),('872','MA','Springfield'),('873','MA','Stockbridge'),('874','MA','Stoughton'),('875','MA','Sturbridge'),('876','MA','Sudbury'),('877','MA','Taunton'),('878','MA','Tewksbury')
        ,('879','MA','Truro'),('880','MA','Watertown'),('881','MA','Webster'),('882','MA','Wellesley'),('883','MA','Wellfleet'),('884','MA','West Bridgewater'),('885','MA','West Springfield'),('886','MA','Westfield')
        ,('887','MA','Weymouth'),('888','MA','Whitman'),('889','MA','Williamstown'),('890','MA','Woburn'),('891','MA','Woods Hole'),('892','MA','Worcester')


		,('893','MI','Adrian'),('894','MI','Alma'),('895','MI','Ann Arbor'),('896','MI','Battle Creek'),('897','MI','Bay City'),('898','MI','Benton Harbor'),('899','MI','Bloomfield Hills'),('900','MI','Cadillac')
        ,('901','MI','Charlevoix'),('902','MI','Cheboygan'),('903','MI','Dearborn'),('904','MI','Detroit'),('905','MI','East Lansing'),('906','MI','Eastpointe'),('907','MI','Ecorse'),('908','MI','Escanaba')
        ,('909','MI','Flint'),('910','MI','Grand Haven'),('911','MI','Grand Rapids'),('912','MI','Grayling'),('913','MI','Grosse Pointe'),('914','MI','Hancock'),('915','MI','Highland Park'),('916','MI','Holland')
        ,('917','MI','Houghton'),('918','MI','Interlochen'),('919','MI','Iron Mountain'),('920','MI','Ironwood'),('921','MI','Ishpeming'),('922','MI','Jackson'),('923','MI','Kalamazoo'),('924','MI','Lansing')
        ,('925','MI','Livonia'),('926','MI','Ludington'),('927','MI','Mackinaw City'),('928','MI','Manistee'),('929','MI','Marquette'),('930','MI','Menominee'),('931','MI','Midland'),('932','MI','Monroe')
        ,('933','MI','Mount Clemens'),('934','MI','Mount Pleasant'),('935','MI','Muskegon'),('936','MI','Niles'),('937','MI','Petoskey'),('938','MI','Pontiac'),('939','MI','Port Huron'),('940','MI','Royal Oak')
        ,('941','MI','Saginaw'),('942','MI','Saint Ignace'),('943','MI','Saint Joseph'),('944','MI','Sault Sainte Marie'),('945','MI','Traverse City'),('946','MI','Trenton'),('947','MI','Warren'),('948','MI','Wyandotte')
        ,('949','MI','Ypsilanti')


		,('950','MN','Albert Lea'),('951','MN','Alexandria'),('952','MN','Austin'),('953','MN','Bemidji'),('954','MN','Bloomington'),('955','MN','Brainerd'),('956','MN','Crookston'),('957','MN','Duluth')
        ,('958','MN','Ely'),('959','MN','Eveleth'),('960','MN','Faribault'),('961','MN','Fergus Falls'),('962','MN','Hastings'),('963','MN','Hibbing'),('964','MN','International Falls'),('965','MN','Little Falls')
        ,('966','MN','Mankato'),('967','MN','Minneapolis'),('968','MN','Moorhead'),('969','MN','New Ulm'),('970','MN','Northfield'),('971','MN','Owatonna'),('972','MN','Pipestone'),('973','MN','Red Wing')
        ,('974','MN','Rochester'),('975','MN','Saint Cloud'),('976','MN','Saint Paul'),('977','MN','Sauk Centre'),('978','MN','South Saint Paul'),('979','MN','Stillwater'),('980','MN','Virginia'),('981','MN','Willmar')
        ,('982','MN','Winona')


		,('983','MS','Bay Saint Louis'),('984','MS','Biloxi'),('985','MS','Canton'),('986','MS','Clarksdale'),('987','MS','Columbia'),('988','MS','Columbus'),('989','MS','Corinth'),('990','MS','Greenville')
        ,('991','MS','Greenwood'),('992','MS','Grenada'),('993','MS','Gulfport'),('994','MS','Hattiesburg'),('995','MS','Holly Springs'),('996','MS','Jackson'),('997','MS','Laurel'),('998','MS','Meridian')
        ,('999','MS','Natchez'),('1000','MS','Ocean Springs'),('1001','MS','Oxford'),('1002','MS','Pascagoula'),('1003','MS','Pass Christian'),('1004','MS','Philadelphia'),('1005','MS','Port Gibson'),('1006','MS','Starkville')
        ,('1007','MS','Tupelo'),('1008','MS','Vicksburg'),('1009','MS','West Point'),('1010','MS','Yazoo City')


		,('1011','MO','Boonville'),('1012','MO','Branson'),('1013','MO','Cape Girardeau'),('1014','MO','Carthage'),('1015','MO','Chillicothe'),('1016','MO','Clayton'),('1017','MO','Columbia'),('1018','MO','Excelsior Springs')
        ,('1019','MO','Ferguson'),('1020','MO','Florissant'),('1021','MO','Fulton'),('1022','MO','Hannibal'),('1023','MO','Independence'),('1024','MO','Jefferson City'),('1025','MO','Joplin'),('1026','MO','Kansas City')
        ,('1027','MO','Kirksville'),('1028','MO','Lamar'),('1029','MO','Lebanon'),('1030','MO','Lexington'),('1031','MO','Maryville'),('1032','MO','Mexico'),('1033','MO','Monett'),('1034','MO','Neosho')
        ,('1035','MO','New Madrid'),('1036','MO','Rolla'),('1037','MO','Saint Charles'),('1038','MO','Saint Joseph'),('1039','MO','Saint Louis'),('1040','MO','Sainte Genevieve'),('1041','MO','Salem'),('1042','MO','Sedalia')
        ,('1043','MO','Springfield'),('1044','MO','Warrensburg'),('1045','MO','West Plains')

		,('1046','MT','Anaconda'),('1047','MT','Billings'),('1048','MT','Bozeman'),('1049','MT','Butte'),('1050','MT','Dillon'),('1051','MT','Fort Benton'),('1052','MT','Glendive'),('1053','MT','Great Falls')
        ,('1054','MT','Havre'),('1055','MT','Helena'),('1056','MT','Kalispell'),('1057','MT','Lewistown'),('1058','MT','Livingston'),('1059','MT','Miles City'),('1060','MT','Missoula'),('1061','MT','Virginia City')


		,('1062','NE','Beatrice'),('1063','NE','Bellevue'),('1064','NE','Boys Town'),('1065','NE','Chadron'),('1066','NE','Columbus'),('1067','NE','Fremont'),('1068','NE','Grand Island'),('1069','NE','Hastings')
        ,('1070','NE','Kearney'),('1071','NE','Lincoln'),('1072','NE','McCook'),('1073','NE','Minden'),('1074','NE','Nebraska City'),('1075','NE','Norfolk'),('1076','NE','North Platte'),('1077','NE','Omaha')
        ,('1078','NE','Plattsmouth'),('1079','NE','Red Cloud'),('1080','NE','Sidney')

		,('1081','NV','Boulder City'),('1082','NV','Carson City'),('1083','NV','Elko'),('1084','NV','Ely'),('1085','NV','Fallon'),('1086','NV','Genoa'),('1087','NV','Goldfield'),('1088','NV','Henderson')
        ,('1089','NV','Las Vegas'),('1090','NV','North Las Vegas'),('1091','NV','Reno'),('1092','NV','Sparks'),('1093','NV','Virginia City'),('1094','NV','Winnemucca')


		,('1095','NH','Berlin'),('1096','NH','Claremont'),('1097','NH','Concord'),('1098','NH','Derry'),('1099','NH','Dover'),('1100','NH','Durham'),('1101','NH','Exeter'),('1102','NH','Franklin')
        ,('1103','NH','Hanover'),('1104','NH','Hillsborough'),('1105','NH','Keene'),('1106','NH','Laconia'),('1107','NH','Lebanon'),('1108','NH','Manchester'),('1109','NH','Nashua'),('1110','NH','Peterborough')
        ,('1111','NH','Plymouth'),('1112','NH','Portsmouth'),('1113','NH','Rochester'),('1114','NH','Salem'),('1115','NH','Somersworth')


		,('1116','NJ','Asbury Park'),('1117','NJ','Atlantic City'),('1118','NJ','Bayonne'),('1119','NJ','Bloomfield'),('1120','NJ','Bordentown'),('1121','NJ','Bound Brook'),('1122','NJ','Bridgeton'),('1123','NJ','Burlington')
        ,('1124','NJ','Caldwell'),('1125','NJ','Camden'),('1126','NJ','Cape May'),('1127','NJ','Clifton'),('1128','NJ','Cranford'),('1129','NJ','East Orange'),('1130','NJ','Edison'),('1131','NJ','Elizabeth')
        ,('1132','NJ','Englewood'),('1133','NJ','Fort Lee'),('1134','NJ','Glassboro'),('1135','NJ','Hackensack'),('1136','NJ','Haddonfield'),('1137','NJ','Hoboken'),('1138','NJ','Irvington'),('1139','NJ','Jersey City')
        ,('1140','NJ','Lakehurst'),('1141','NJ','Lakewood'),('1142','NJ','Long Beach'),('1143','NJ','Long Branch'),('1144','NJ','Madison'),('1145','NJ','Menlo Park'),('1146','NJ','Millburn'),('1147','NJ','Millville')
        ,('1148','NJ','Montclair'),('1149','NJ','Morristown'),('1150','NJ','Mount Holly'),('1151','NJ','New Brunswick'),('1152','NJ','New Milford'),('1153','NJ','Newark'),('1154','NJ','Ocean City'),('1155','NJ','Orange')
        ,('1156','NJ','Parsippany-Troy Hills'),('1157','NJ','Passaic'),('1158','NJ','Paterson'),('1159','NJ','Perth Amboy'),('1160','NJ','Plainfield'),('1161','NJ','Princeton'),('1162','NJ','Ridgewood'),('1163','NJ','Roselle')
        ,('1164','NJ','Rutherford'),('1165','NJ','Salem'),('1166','NJ','Somerville'),('1167','NJ','South Orange Village'),('1168','NJ','Totowa'),('1169','NJ','Trenton'),('1170','NJ','Union'),('1171','NJ','Union City')
        ,('1172','NJ','Vineland'),('1173','NJ','Wayne'),('1174','NJ','Weehawken'),('1175','NJ','West New York'),('1176','NJ','West Orange'),('1177','NJ','Willingboro'),('1178','NJ','Woodbridge')

		,('1179','NM','Acoma'),('1180','NM','Alamogordo'),('1181','NM','Albuquerque'),('1182','NM','Artesia'),('1183','NM','Belen'),('1184','NM','Carlsbad'),('1185','NM','Clovis'),('1186','NM','Deming')
        ,('1187','NM','Farmington'),('1188','NM','Gallup'),('1189','NM','Grants'),('1190','NM','Hobbs'),('1191','NM','Las Cruces'),('1192','NM','Las Vegas'),('1193','NM','Los Alamos'),('1194','NM','Lovington')
        ,('1195','NM','Portales'),('1196','NM','Raton'),('1197','NM','Roswell'),('1198','NM','Santa Fe'),('1199','NM','Shiprock'),('1200','NM','Silver City'),('1201','NM','Socorro'),('1202','NM','Taos')
        ,('1203','NM','Truth or Consequences'),('1204','NM','Tucumcari')

		,('1205','NY','Albany'),('1206','NY','Amsterdam'),('1207','NY','Auburn'),('1208','NY','Babylon'),('1209','NY','Batavia'),('1210','NY','Beacon'),('1211','NY','Bedford'),('1212','NY','Binghamton')
        ,('1213','NY','Bronx'),('1214','NY','Brooklyn'),('1215','NY','Buffalo'),('1216','NY','Chautauqua'),('1217','NY','Cheektowaga'),('1218','NY','Clinton'),('1219','NY','Cohoes'),('1220','NY','Coney Island')
        ,('1221','NY','Cooperstown'),('1222','NY','Corning'),('1223','NY','Cortland'),('1224','NY','Crown Point'),('1225','NY','Dunkirk'),('1226','NY','East Aurora'),('1227','NY','East Hampton'),('1228','NY','Eastchester')
        ,('1229','NY','Elmira'),('1230','NY','Flushing'),('1231','NY','Forest Hills'),('1232','NY','Fredonia'),('1233','NY','Garden City'),('1234','NY','Geneva'),('1235','NY','Glens Falls'),('1236','NY','Gloversville')
        ,('1237','NY','Great Neck'),('1238','NY','Hammondsport'),('1239','NY','Harlem'),('1240','NY','Hempstead'),('1241','NY','Herkimer'),('1242','NY','Hudson'),('1243','NY','Huntington'),('1244','NY','Hyde Park')
        ,('1245','NY','Ilion'),('1246','NY','Ithaca'),('1247','NY','Jamestown'),('1248','NY','Johnstown'),('1249','NY','Kingston'),('1250','NY','Lackawanna'),('1251','NY','Lake Placid'),('1252','NY','Levittown')
        ,('1253','NY','Lockport'),('1254','NY','Mamaroneck'),('1255','NY','Manhattan'),('1256','NY','Massena'),('1257','NY','Middletown'),('1258','NY','Mineola'),('1259','NY','Mount Vernon'),('1260','NY','New Paltz')
        ,('1261','NY','New Rochelle'),('1262','NY','New Windsor'),('1263','NY','New York City'),('1264','NY','Newburgh'),('1265','NY','Niagara Falls'),('1266','NY','North Hempstead'),('1267','NY','Nyack'),('1268','NY','Ogdensburg')
        ,('1269','NY','Olean'),('1270','NY','Oneida'),('1271','NY','Oneonta'),('1272','NY','Ossining'),('1273','NY','Oswego'),('1274','NY','Oyster Bay'),('1275','NY','Palmyra'),('1276','NY','Peekskill')
        ,('1277','NY','Plattsburgh'),('1278','NY','Port Washington'),('1279','NY','Potsdam'),('1280','NY','Poughkeepsie'),('1281','NY','Queens'),('1282','NY','Rensselaer'),('1283','NY','Rochester'),('1284','NY','Rome')
        ,('1285','NY','Rotterdam'),('1286','NY','Rye'),('1287','NY','Sag Harbor'),('1288','NY','Saranac Lake'),('1289','NY','Saratoga Springs'),('1290','NY','Scarsdale'),('1291','NY','Schenectady'),('1292','NY','Seneca Falls')
        ,('1293','NY','Southampton'),('1294','NY','Staten Island'),('1295','NY','Stony Brook'),('1296','NY','Stony Point'),('1297','NY','Syracuse'),('1298','NY','Tarrytown'),('1299','NY','Ticonderoga'),('1300','NY','Tonawanda')
        ,('1301','NY','Troy'),('1302','NY','Utica'),('1303','NY','Watertown'),('1304','NY','Watervliet'),('1305','NY','Watkins Glen'),('1306','NY','West Seneca'),('1307','NY','White Plains'),('1308','NY','Woodstock')
        ,('1309','NY','Yonkers')

		,('1310','NC','Asheboro'),('1311','NC','Asheville'),('1312','NC','Bath'),('1313','NC','Beaufort'),('1314','NC','Boone'),('1315','NC','Burlington'),('1316','NC','Chapel Hill'),('1317','NC','Charlotte')
        ,('1318','NC','Concord'),('1319','NC','Durham'),('1320','NC','Edenton'),('1321','NC','Elizabeth City'),('1322','NC','Fayetteville'),('1323','NC','Gastonia'),('1324','NC','Goldsboro'),('1325','NC','Greensboro')
        ,('1326','NC','Greenville'),('1327','NC','Halifax'),('1328','NC','Henderson'),('1329','NC','Hickory'),('1330','NC','High Point'),('1331','NC','Hillsborough'),('1332','NC','Jacksonville'),('1333','NC','Kinston')
        ,('1334','NC','Kitty Hawk'),('1335','NC','Lumberton'),('1336','NC','Morehead City'),('1337','NC','Morganton'),('1338','NC','Nags Head'),('1339','NC','New Bern'),('1340','NC','Pinehurst'),('1341','NC','Raleigh')
        ,('1342','NC','Rocky Mount'),('1343','NC','Salisbury'),('1344','NC','Shelby'),('1345','NC','Washington'),('1346','NC','Wilmington'),('1347','NC','Wilson'),('1348','NC','Winston - Salem')

		,('1349','ND','Bismarck'),('1350','ND','Devils Lake'),('1351','ND','Dickinson'),('1352','ND','Fargo'),('1353','ND','Grand Forks'),('1354','ND','Jamestown'),('1355','ND','Mandan'),('1356','ND','Minot')
        ,('1357','ND','Rugby'),('1358','ND','Valley City'),('1359','ND','Wahpeton'),('1360','ND','Williston')

		,('1361','OH','Akron'),('1362','OH','Alliance'),('1363','OH','Ashtabula'),('1364','OH','Athens'),('1365','OH','Barberton'),('1366','OH','Bedford'),('1367','OH','Bellefontaine'),('1368','OH','Bowling Green')
        ,('1369','OH','Canton'),('1370','OH','Chillicothe'),('1371','OH','Cincinnati'),('1372','OH','Cleveland'),('1373','OH','Cleveland Heights'),('1374','OH','Columbus'),('1375','OH','Conneaut'),('1376','OH','Cuyahoga Falls')
        ,('1377','OH','Dayton'),('1378','OH','Defiance'),('1379','OH','Delaware'),('1380','OH','East Cleveland'),('1381','OH','East Liverpool'),('1382','OH','Elyria'),('1383','OH','Euclid'),('1384','OH','Findlay')
        ,('1385','OH','Gallipolis'),('1386','OH','Greenville'),('1387','OH','Hamilton'),('1388','OH','Kent'),('1389','OH','Kettering'),('1390','OH','Lakewood'),('1391','OH','Lancaster'),('1392','OH','Lima')
        ,('1393','OH','Lorain'),('1394','OH','Mansfield'),('1395','OH','Marietta'),('1396','OH','Marion'),('1397','OH','Martins Ferry'),('1398','OH','Massillon'),('1399','OH','Mentor'),('1400','OH','Middletown')
        ,('1401','OH','Milan'),('1402','OH','Mount Vernon'),('1403','OH','New Philadelphia'),('1404','OH','Newark'),('1405','OH','Niles'),('1406','OH','North College Hill'),('1407','OH','Norwalk'),('1408','OH','Oberlin')
        ,('1409','OH','Painesville'),('1410','OH','Parma'),('1411','OH','Piqua'),('1412','OH','Portsmouth'),('1413','OH','Put -in-Bay'),('1414','OH','Salem'),('1415','OH','Sandusky'),('1416','OH','Shaker Heights')
        ,('1417','OH','Springfield'),('1418','OH','Steubenville'),('1419','OH','Tiffin'),('1420','OH','Toledo'),('1421','OH','Urbana'),('1422','OH','Warren'),('1423','OH','Wooster'),('1424','OH','Worthington')
        ,('1425','OH','Xenia'),('1426','OH','Yellow Springs'),('1427','OH','Youngstown'),('1428','OH','Zanesville')

		,('1429','OK','Ada'),('1430','OK','Altus'),('1431','OK','Alva'),('1432','OK','Anadarko'),('1433','OK','Ardmore'),('1434','OK','Bartlesville'),('1435','OK','Bethany'),('1436','OK','Chickasha')
        ,('1437','OK','Claremore'),('1438','OK','Clinton'),('1439','OK','Cushing'),('1440','OK','Duncan'),('1441','OK','Durant'),('1442','OK','Edmond'),('1443','OK','El Reno'),('1444','OK','Elk City')
        ,('1445','OK','Enid'),('1446','OK','Eufaula'),('1447','OK','Frederick'),('1448','OK','Guthrie'),('1449','OK','Guymon'),('1450','OK','Hobart'),('1451','OK','Holdenville'),('1452','OK','Hugo')
        ,('1453','OK','Lawton'),('1454','OK','McAlester'),('1455','OK','Miami'),('1456','OK','Midwest City'),('1457','OK','Moore'),('1458','OK','Muskogee'),('1459','OK','Norman'),('1460','OK','Oklahoma City')
        ,('1461','OK','Okmulgee'),('1462','OK','Pauls Valley'),('1463','OK','Pawhuska'),('1464','OK','Perry'),('1465','OK','Ponca City'),('1466','OK','Pryor'),('1467','OK','Sallisaw'),('1468','OK','Sand Springs')
        ,('1469','OK','Sapulpa'),('1470','OK','Seminole'),('1471','OK','Shawnee'),('1472','OK','Stillwater'),('1473','OK','Tahlequah'),('1474','OK','The Village'),('1475','OK','Tulsa'),('1476','OK','Vinita')
        ,('1477','OK','Wewoka'),('1478','OK','Woodward')


		,('1479','OR','Albany'),('1480','OR','Ashland'),('1481','OR','Astoria'),('1482','OR','Baker City'),('1483','OR','Beaverton'),('1484','OR','Bend'),('1485','OR','Brookings'),('1486','OR','Burns')
        ,('1487','OR','Coos Bay'),('1488','OR','Corvallis'),('1489','OR','Eugene'),('1490','OR','Grants Pass'),('1491','OR','Hillsboro'),('1492','OR','Hood River'),('1493','OR','Jacksonville'),('1494','OR','John Day')
        ,('1495','OR','Klamath Falls'),('1496','OR','La Grande'),('1497','OR','Lake Oswego'),('1498','OR','Lakeview'),('1499','OR','McMinnville'),('1500','OR','Medford'),('1501','OR','Newberg'),('1502','OR','Newport')
        ,('1503','OR','Ontario'),('1504','OR','Oregon City'),('1505','OR','Pendleton'),('1506','OR','Port Orford'),('1507','OR','Portland'),('1508','OR','Prineville'),('1509','OR','Redmond'),('1510','OR','Reedsport')
        ,('1511','OR','Roseburg'),('1512','OR','Salem'),('1513','OR','Seaside'),('1514','OR','Springfield'),('1515','OR','The Dalles'),('1516','OR','Tillamook')

		,('1517','PA','Abington'),('1518','PA','Aliquippa'),('1519','PA','Allentown'),('1520','PA','Altoona'),('1521','PA','Ambridge'),('1522','PA','Bedford'),('1523','PA','Bethlehem'),('1524','PA','Bloomsburg')
        ,('1525','PA','Bradford'),('1526','PA','Bristol'),('1527','PA','Carbondale'),('1528','PA','Carlisle'),('1529','PA','Chambersburg'),('1530','PA','Chester'),('1531','PA','Columbia'),('1532','PA','Easton')
        ,('1533','PA','Erie'),('1534','PA','Franklin'),('1535','PA','Germantown'),('1536','PA','Gettysburg'),('1537','PA','Greensburg'),('1538','PA','Hanover'),('1539','PA','Harmony'),('1540','PA','Harrisburg')
        ,('1541','PA','Hazleton'),('1542','PA','Hershey'),('1543','PA','Homestead'),('1544','PA','Honesdale'),('1545','PA','Indiana'),('1546','PA','Jeannette'),('1547','PA','Jim Thorpe'),('1548','PA','Johnstown')
        ,('1549','PA','Lancaster'),('1550','PA','Lebanon'),('1551','PA','Levittown'),('1552','PA','Lewistown'),('1553','PA','Lock Haven'),('1554','PA','Lower Southampton'),('1555','PA','McKeesport'),('1556','PA','Meadville')
        ,('1557','PA','Middletown'),('1558','PA','Monroeville'),('1559','PA','Nanticoke'),('1560','PA','New Castle'),('1561','PA','New Hope'),('1562','PA','New Kensington'),('1563','PA','Norristown'),('1564','PA','Oil City')
        ,('1565','PA','Philadelphia'),('1566','PA','Phoenixville'),('1567','PA','Pittsburgh'),('1568','PA','Pottstown'),('1569','PA','Pottsville'),('1570','PA','Reading'),('1571','PA','Scranton'),('1572','PA','Shamokin')
        ,('1573','PA','Sharon'),('1574','PA','State College'),('1575','PA','Stroudsburg'),('1576','PA','Sunbury'),('1577','PA','Swarthmore'),('1578','PA','Tamaqua'),('1579','PA','Titusville'),('1580','PA','Uniontown')
        ,('1581','PA','Warren'),('1582','PA','Washington'),('1583','PA','West Chester'),('1584','PA','Wilkes - Barre'),('1585','PA','Williamsport'),('1586','PA','York')


















































	

	
*/
