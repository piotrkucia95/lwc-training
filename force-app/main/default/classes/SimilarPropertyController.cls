public with sharing class SimilarPropertyController {
	
    @AuraEnabled(cacheable=true)
    public static List<Property__c> getSimilarProperties (Id recordId, String searchCriteria, Decimal beds, Decimal price, Decimal priceRange, Decimal locationRange ) {
        if (searchCriteria == 'Bedrooms') {
            return [
                SELECT Id, Name, Beds__c, Baths__c, Price__c, Broker__c, Status__c, Thumbnail__c
                FROM Property__c WHERE Id != :recordId AND Beds__c = :beds
            ];
        } else if (searchCriteria == 'Price'){
            Decimal range;
            if (priceRange == null) {
                range = 100000;
            } else {
                range = priceRange;
            }
            return [
                SELECT Id, Name, Beds__c, Baths__c, Price__c, Broker__c, Status__c, Thumbnail__c
                FROM Property__c WHERE Id != :recordId AND Price__c > :price - range AND Price__c < :price + range
            ];
        } else {
            Decimal range;
            if (locationRange == null) {
                range = 10000;
            } else {
                range = locationRange;
            }

            // Property__c currentProperty = [SELECT Id, Location__c FROM Property__c WHERE Id = :recordId LIMIT 1];


            return [
                SELECT Id, Location__latitude__s, Location__longitude__s, Name, Beds__c, Baths__c, Price__c, Broker__c, Status__c, Thumbnail__c
                FROM Property__c WHERE Id != :recordId
            ];

        } 
    }
 }