const api = require('./lib/api')

const query = {
    "locale": "en_GB",
    "vehicleCategory": "10",
    "distance": "100",
    "longLatCoordinates": "-1.0930142,51.2806785",
    "model": [
        {
            "searchTerm": "FIESTA"
        }
    ],
    // "exteriorColor": [
    //     {
    //         "searchTerm": "BLUE"
    //     },
    //     {
    //         "searchTerm": "GREY"
    //     }
    // ],
    "price": {
        "maxPrice": "25000",
        "minPrice": "15000"
    },
    "enginePower": {
        "min": "180",
        "max": "9999"
    },
    "ageOfVehicle": {
        "min": "0",
        "max": "5"
    },
    "mileage": {
        "min": "0",
        "max": "999999"
    },
    "resultOrder": {
        "orderBy": "Price",
        "sortOrder": "Ascending"
    },
    "pagination": {
        "maxRecords": 30,
        "startingRecord": 0
    }
}

const main = async () => {
   
    const [error, search] = await api('post', 'api/eUsed/v1/searchVehicles', query)
    if(error) {
        console.error(error)
        return;
    }

    const filter = search.VehicleInventoryList.VehicleInventoryItem.filter(({Vehicle}) => Vehicle.Configuration.NumberOfDoors == 5)

    console.log("\n", "########## Cars ##########", "\n")

    filter.forEach((item) => {
        console.log("Variant: ", item.Vehicle.Variant.ShortDescription)
        console.log("Cost: ", item.VendorInformation.Price.value)
        console.log("Colour: ", item.Vehicle.Configuration.Appearance.ExteriorColor.ShortDescription)
        console.log("Doors: ", item.Vehicle.Configuration.NumberOfDoors)
        console.log("Miles: ", item.Vehicle.CurrentCondition.CurrentOdometerReading.value)
        console.log("Scheme: ", item.Vehicle.CurrentCondition.SchemeAvailable)
        console.log("Garage: ", item.VendorInformation.VendorName)
        // console.log(item.Vehicle.Configuration.Features.FeatureGroup[0].Feature)
        if(item.Vehicle.Configuration.Features.FeatureGroup[0].Feature.filter(feature => feature.ShortDescription == "Power opening panorama roof").length == 1) {
            console.log("Panormaic Roof: True")
        }

        console.log("Link: ", `https://www.ford.co.uk/shop/price-and-locate/approved-used/approved-used-cars/results#/vehicleDetails/${item.Vehicle.Identity.ID}/${item.VendorInformation.VendorCode}`)
        console.log("\n", "####################", "\n")

    })


}

main()