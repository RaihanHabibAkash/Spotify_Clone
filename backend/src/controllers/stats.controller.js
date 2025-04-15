import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";

export const getStats = async (req, res, next) => {
    try {
        // Will run all code with same time 
        const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
            Song.countDocuments(),
            Album.countDocuments(),
            User.countDocuments(),

            // for counting unique artist
            Song.aggregate([
                {
                    // combile two collection
                    $unionWith:{
                        // Combine Song with album
                        coll: "albums",
                        // no additional transformations are applied to the Albums collection
                        pipeline: []
                    }
                },
                {
                    $group:{
                        // group by unique artist
                        _id: "$artist",
                    }
                },
                {
                    $count: "count"
                }
            ])
        ]);

        res.status(200).json({
            totalSongs,
            totalAlbums,
            totalUsers,
            totalArtists: uniqueArtists[0]?.count || 0
        });
    } catch (error) {
        next(error);
    }
};