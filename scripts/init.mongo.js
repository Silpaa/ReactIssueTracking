db = new Mongo().getDB('issuetracker');
db.issues.remove({});
db.issues.insert([
  {
    status:'Open',owner:'Ravan',
    created:new Date('2017-04-13'),effort:5,
    completionDate:undefined,
    title:'Error in console when clicking Add',
  },
  {
    status:'Assigned',owner:'Eddie',
    created:new Date('2015-04-05'),effort:14,
    completionDate:new Date('2016-04-05'),
    title:'Missing botton border on panel',
  },
]);
db.issues.createIndex({status:1});
db.issues.createIndex({owner:1});
db.issues.createIndex({created:1});
