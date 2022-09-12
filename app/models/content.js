import DS from 'ember-data';
export default DS.Model.extend({
    pageId: DS.attr('string'),
    title: DS.attr('string'),
    content: DS.attr('string'),
    key: DS.attr('string')
});