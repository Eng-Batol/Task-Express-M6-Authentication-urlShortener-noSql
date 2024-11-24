const Url = require("../../models/Url");
const shortid = require("shortid");
const User = require("../../models/User");

const baseUrl = "http:localhost:8000/urls";

const shorten = async (req, res, next) => { 
  const urlCode = shortid.generate(); 
  try { 
    req.body.shortUrl = `${baseUrl}/${urlCode}`; 
    req.body.urlCode = urlCode; 
    req.body.userId = req.user._id; 
   const newUrl = await Url.create(req.body); 
   await User.findByIdAndUpdate(req.user._id, {
  
      $push: { urls: newUrl._id },
     });
      res.json(newUrl); 
    } catch (err) { 
      next(err); 
       }
      };

// exports.redirect = async (req, res) => {
//   try {
//     const url = await Url.findOne({ urlCode: req.params.code });
//     if (url) {
//       return res.redirect(url.longUrl);
//     } else {
//       return res.status(404).json("No URL Found");
//     }
//   } catch (err) {
//     next(err);
//   }
// };
const redirect = async (req, res, next) => { 
  try { 
    const url = await Url.findOne({ urlCode: req.params.code }); 
    if (url) { return res.redirect(url.longUrl); } 
    else { return res.status(404).json("No URL Found"); 

    } 
  } catch (err)
   { 
    next(err); 
   }
  };

const deleteUrl = async (req, res, next) => {
  try {
    const { code } = req.params;
    const userId = req.user._id; 

    const url = await Url.findOne({ urlCode: code });

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

   
    if (url.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized: You are not the creator of this URL' });
    }

    
    await url.remove();
    res.status(200).json({ message: 'URL deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
    next(err);
  }
};

// module.exports = { shorten, redirect, deleteUrl};
module.exports = { shorten, redirect, deleteUrl };