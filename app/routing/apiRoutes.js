let friends = require("../data/friends");

module.exports = function(app) {

    // get a list of all friends
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });

    // client posts survey answers and receives their closest match from the 'friends' array
    app.post("/api/friends", function(req, res){
        console.log("POST request at /api/friends");
        let user = req.body;
        console.log(user);

        let bestFriend = {};
        let bestCompatibility = Infinity;
        friends.forEach(function(friend) {
            let compatibility = 0;
            for (let i=0; i<friend.scores.length; i++) {
                user.scores[i] = parseInt(user.scores[i]);
                compatibility += Math.abs(user.scores[i] - friend.scores[i]);
            }
            console.log("compatibility: " + compatibility);
            if (compatibility<bestCompatibility) {
                bestCompatibility = compatibility;
                bestFriend = friend;
            }
        });
        res.json({
            name: bestFriend.name,
            photo: bestFriend.photo
        });

        friends.push(user)
    });
}