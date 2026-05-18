
let autoDB = [
            {make: `BMW`, 
                models: [
                    {model: `E46`, type: [`Coupe`], engine:[`Inline`], year: 1997 }, // Add ModelYear as year[1992]
                    {model: `E90`, type: [`Sedan`], engine:[`V`], year: 2004},
                    {model: `i7`, type: [`Sedan`], engine:[`Electric`], year: 2022}       
                ]
           }, // BMW

            {make: `Ferrari`, 
                models: [
                    {model: `F40`, type: [`Sports`], engine:[`V`], year: 1987},
                    {model: `Purosangue`, type: [`SUV`], engine:[`V`], year: 2022},
                    {model: `Elettrica`, type: [`Sports`], engine:[`Electric`], year: 2025}    
                ]
            },// Ferrari
            
            {make: `Toyota`,
                models:[
                    {model: `Yaris Cross`, type: [`Hatchback`], engine:[`Hybrid`], year: 2020},
                    {model: `Camry`, type:[`Luxury`] , engine:[`Inline`], year: 2000},
                    {model:`Corolla GR`, type:[`Hatchback`], engine:[`Inline`], year: 2022}
                ]
            },// Toyota

        ];

export default autoDB;
///// short term DB

