import { taskModel } from "../models/taskModel.js";

export const addTask = async (req, res) => {
  const { title, description, duedate } = req.body;

  if (!title || !description) {
    return res.status(400).json({ success: false, message: "Fill The Form" });
  }

  try {
    const newTask = new taskModel({
      title,
      description,
      duedate,
      userid: req.UserId,
    });

    await newTask.save();

    return res
      .status(201)
      .json({ success: true, message: "Task Added Successfully " });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const Update = async (req, res) => {
  const { task, description, status, priority, duedate } = req.body;
  const { id } = req.params;
  try {
    await taskModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { returnDocument: "after" },
    );

    return res.status(200).json({ success: true, message: "updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getTaskWithId = async (req, res) => {
  const userid = req.UserId;
  try {
    const task = await taskModel.find({ userid });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({ success: true, task });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await taskModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const filterTask = async (req, res) => {
  const { status } = req.query;

  if (!status) {
    return res
      .status(400)
      .json({ success: false, message: "No Query Provided" });
  }

  try {
    const data = await taskModel.find({ status });

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Task Not Found" });
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);
  }
};
