db = connect("localhost:27017/admin");

db.auth('administrator','');

db = db.getSiblingDB('SpeedTestSurvey');

db.createUser(
    {
        user: "SpeedTestSurvey_User",
        pwd: "",
        roles: [ "readWrite" ]
    }
);