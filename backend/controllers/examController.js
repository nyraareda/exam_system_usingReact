const Exam = require("../models/exam");

exports.createExam = async (req, res) => {
  try {
    const { name, questions } = req.body;
    const exam = new Exam({ name, questions });
    const result = await exam.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("questions");
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExam = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(id).populate("questions");
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExam = async (req, res) => {
  const { name, questions } = req.body;
  const { id } = req.params;
  try {
    const exam = await Exam.findByIdAndUpdate(
      id,
      { name, questions },
      { new: true }
    );
    res.status(204).json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/// remove question from exam
exports.removeQuestionFromExam = async (req, res) => {
  const { examId, questionId } = req.params;
  try {
    const exam = await Exam.findByIdAndUpdate(
      examId,
      { $pull: { questions: questionId } },
      { new: true }
    );
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add question to exam
exports.addQuestionToExam = async (req, res) => {
  const { examId, questionId } = req.params;
  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    if (!exam.questions.includes(questionId)) {
      exam.questions.push(questionId);
      console.log(exam);
      await exam.save();
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExamDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(id).populate("questions");
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { user, answers } = req.body;
    // Logic to calculate the score based on answers
    const exam = await Exam.findById(examId).populate("questions");
    let score = 0;
    if (exam) {
      exam.questions.forEach((question, index) => {
        if (question.correctOption === answers[index]) {
          score += 1;
        }
      });
    }
    const newResult = new Result({ user, exam: examId, score });
    await newResult.save();
    res.status(201).json(newResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
