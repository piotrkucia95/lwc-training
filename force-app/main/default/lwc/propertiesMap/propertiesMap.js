/* eslint-disable no-debugger */
/* eslint-disable no-console */
import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { CurrentPageReference } from 'lightning/navigation';
import findProperties from '@salesforce/apex/SimilarPropertyController.getSimilarProperties';

const fields = [
    'Property__c.Name',
    'Property__c.Price__c',
    'Property__c.Status__c',
    'Property__c.Beds__c',
    'Property__c.Broker__c'
]

export default class PropertiesMap extends LightningElement {

    @api recordId;
    @track props;
    @track errorMsg;
    @track property;
    @track price;
    @track beds;
    @api searchCriteria = 'Location';
    @api priceRange = '100000';
    @api locationRange = '1000';
    @track cardTitle;
    @track mapMarkers = [];
                
    @wire(findProperties, { 
        recordId: '$recordId',
        priceRange: '$priceRange',
        price: '$price',
        searchCriteria: '$searchCriteria',
        beds: '$beds',
        locationRange: '$locationRange'
    })
    wiredProps(value) {
        this.wiredRecords = value;
        if (value.error) {
            this.errorMsg = value.error;
            console.log("ERROR: ", this.errorMsg);
        } else if (value.data) {
            this.props = value.data;
            this.handlePropertiesListUpdate(value.data);
        }
        
    }

    @wire(getRecord, {recordId: '$recordId', fields})
    wiredProperty(value) {
        if (value.data) {
            this.property = value.data;
            this.price = this.property.fields.Price__c.value;
            this.beds = this.property.fields.Beds__c.value;
        } else if (value.error) {
            console.log("OOOPS: ", value.error)
        }
    }

    @wire(CurrentPageReference) pageRef;

    handlePropertiesListUpdate(properties) {
        console.log('properties')
        console.log(properties);
        this.mapMarkers = properties.map(property => {
            const Latitude = property.Location__Latitude__s;
            const Longitude = property.Location__Longitude__s;
            return {
                location: { Latitude, Longitude },
                title: property.Name,
                description: `Coords: ${Latitude}, ${Longitude}`
            };
        });
    }

    handleClick() {
        console.log(this.props);
    }

}