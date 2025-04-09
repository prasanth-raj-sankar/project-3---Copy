// async function create_Categories(req, res) { // ✅ Use correct function name
//     try {
//         const category = new model.Categories({
//             type: "Savings",
//             color: "#ffc234"
//         });

//         const savedCategory = await category.save(); // ✅ Use async/await
//         res.json(savedCategory);
//     } catch (err) {
//         res.status(400).json({ message: `Error while creating categories: ${err.message}` });
//     }
// }

// module.exports = {
//     create_Categories // ✅ Ensure correct export
// };













const model = require('../models/model');

//post
async function create_Categories(req, res) { // ✅ Use async function
    try {
        const category = new model.Categories({
            type: "Investment",
            color: "#FCBE44"
        });

        const savedCategory = await category.save(); // ✅ Use async/await
        res.json(savedCategory); // ✅ Return JSON response
    } catch (err) {
        res.status(400).json({ message: `Error while creating categories: ${err.message}` });
    }
}

//get
async function get_Categories(req,res) {
    let data = await model.Categories.find({})

   let filter = await data.map(v =>Object.assign({}, {type:v.type,color:v.color}));
    return res.json(filter);
}

//post:http://localhost:8080/api/transaction
async function create_Transaction(req, res) {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Post HTTP data not provided" });
        }

        let { name, type, amount } = req.body;

        const create = new model.Transaction({
            name,
            type,
            amount,
            date: new Date() // ✅ Fix typo (was `data`, should be `date`)
        });

        const savedTransaction = await create.save(); // ✅ Use async/await
        res.json(savedTransaction); // ✅ Send response
    } catch (err) {
        res.status(400).json({ message: `Error while creating transaction: ${err.message}` });
    }
}


//get:http://localhost:8080/api/transaction

async function get_Transaction(req,res) {
    let data = await model.Transaction.find({});
    return res.json(data);
    
}


//delete:http://localhost:8080/api/transaction

async function delete_Transaction(req, res) {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Request body not found" });
        }

        const result = await model.Transaction.deleteOne(req.body);

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json({ message: "Record deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error while deleting transaction record", error: err.message });
    }
}


//get:http://localhost:8080/api/labels

async function get_Labels(req, res) {
    try {
        const result = await model.Transaction.aggregate([
            {
                $lookup: {
                    from: "categories", // Ensure this matches the actual collection name
                    localField: "type",
                    foreignField: "type",
                    as: "categories_info"
                }
            },
            { $unwind: "$categories_info" } // Unwind the joined category info
        ]);

        // ✅ Correct object mapping
        const data = result.map(v => ({
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info.color // Fix case sensitivity issue
        }));

        res.json(data);
    } catch (error) {
        console.error("Error in get_Labels:", error);
        res.status(500).json({ message: "Lookup collection error", error: error.message });
    }
}


// async function get_Labels(req,res) {

//     model.Transaction.aggregate([
//         {
//             $lookup:{
//                 from:"categories",
//                 localField:'type',
//                 foreignField:"type",
//                 as:"categories_info"
//             }
//         },
//         {
//             $unwind:"$categories_info"
//         }
//     ]).then(result =>{
//         let data = result.map(v=>Object.assign({},{_id:_id,name:v.name,type:v.type,amount:v,amount,color:v.Categories_info['color']}))
//         res.json(data);

//     }).catch(error =>{
//         res.status(400).json("Looup collection Error");
//     })
    
// }




// async function delete_Transaction(req,res) {
//     if(!req.body)res.status(400).json({message:"Request body not found"});
//     await model.Transaction.deleteOne(req.body.function(err){
//         if(!err) res.json("record deletes...!")
//     }).clone().catch(function(err){res.json("Error while deleting transaction Record")});
    
// }




// async function create_Transaction(req,res) {
//     if(!req.body) return res.status(400).json("post Http Data not Provided");
//     let {name,type,amount} = req.body;

//     const create = await new model.Transaction(
//         {
//          name,
//          type,
//          amount,
//          data:new Date()
//         }
//     );

//     create.save(function(err){
//         if(!err) return res.json(create);
//         return res.status(400).json({message:`erro while creating transaction ${err}`});
//     });
// }

module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
};
