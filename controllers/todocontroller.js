import Todo from "../model/todoModel.js";

// ✅ Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200,"bachi mil gai ").json(todos);
  } catch (error) {
    res.status(500,"server war gaya").json({ message: error.message });
  }
};

// ✅ Create new todo/post
export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === "") {
      return res.status(400,"galat req bhj rahai ho").json({ message: "Todo text is required" });
    }

    const newTodo = new Todo({ text });
    const savedTodo = await newTodo.save();

    res.status(201,"data ban gaya ").json(savedTodo);
  } catch (error) {
    res.status(500,"server war gaya").json({ message: error.message });
  }
};

// ✅ Toggle todo completion
export const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Edit todo
export const editTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true, runValidators: true }
    );
    if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
