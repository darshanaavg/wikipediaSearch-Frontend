import DS from 'ember-data';

export default DS.RESTSerializer.extend({  
    
    normalizeResponse(store, primaryModelClass, payload, id, requestType){
        var newPayload = {};
        newPayload[primaryModelClass.modelName] = payload.response;
        return this._super(store, primaryModelClass, newPayload, id, requestType);
    },
    primaryKey: 'pageId'
   
});

