const extractTextFromPDF =
  require("../services/pdfServices");

const analyzeResume =
  require("../services/groqService");

const Analysis =
  require("../models/Analysis");

// Upload Resume + Analyze + Save
const uploadResume = async (req, res) => {
  try {

    console.log("Uploaded File:", req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF file",
      });
    }

    const extractedText =
      await extractTextFromPDF(req.file.path);

    const analysis =
      await analyzeResume(extractedText);

    const savedAnalysis =
      await Analysis.create({
        userId: req.user.id,
        resumeText: extractedText,
        analysis,
      });

    console.log("Saved Analysis:");
    console.log(savedAnalysis);

    res.status(200).json({
      success: true,
      savedAnalysis,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Analysis History
const getAnalysisHistory = async (req, res) => {
  try {

    console.log("User:", req.user);
    
    const analyses = await Analysis.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      analyses,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
  getAnalysisHistory,
};