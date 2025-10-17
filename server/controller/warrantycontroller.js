import { addWarrantyCard, getAllWarrantyCards } from "../models/warrantymodel.js";

export const createWarrantyCard = async (req, res) => {
  try {
    const {
      sale_item_id,
      customer_id,
      product_id,
      warranty_start_date,
      warranty_end_date,
      warranty_card_no,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Warranty image is required" });
    }

    // ✅ Cloudinary returns a URL in req.file.path
    const warranty_image = req.file.path;

    const newCard = await addWarrantyCard({
      sale_item_id,
      customer_id,
      product_id,
      warranty_start_date,
      warranty_end_date,
      warranty_image, // Cloudinary URL stored in DB
      warranty_card_no,
    });

    res.status(201).json(newCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const listWarrantyCards = async (req, res) => {
  try {
    const cards = await getAllWarrantyCards();
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
