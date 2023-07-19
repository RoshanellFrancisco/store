import express, { response } from "express";
import cors from "cors";
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());



// create post req
// * POST /api/products  - Creates a new product. 
//     * Response Code: 201 - Returns the newly created product
//     * Response Code: 400 - Request missing a product field
app.post("/api/products", cors(), async (req, res) => {
	console.log(
		"creating product", req.body.name, req.body.description);
	try {
		const newProduct = {
			name: req.body.name,
			description: req.body.description,
            imageUrl: req.body.imageUrl,
		};
		const result = await prisma.Product.create(
            {data: newProduct}
		);
        res.status(201).send(newProduct)
	
	} catch (e) {
		// console.log(e);
		// return res.status(500).json({ e });
        res.status(400).send("Missing product field")
	}
});

// * GET /api/products/:id  - Returns the product with the specified id.
//     * Response Code: 200 - Individual product.
//     * Response Code: 404 - Product does not exist.

app.get("/api/products/:id", async (req, res) => {
	console.log(req.params.id);
	try {
        const product = await prisma.Product.findUnique({
            where: {
                id: req.params.id,
              },
        })
        console.log(product)
        if (product === null ){
            res.status(404).send("Product does not exist. Please enter another id.")
        } else{
            res.status(201).send(product)
	
        }
	} catch (e) {
		return res.status(500).json({ e });
	}
});
// * GET /api/products  - Returns an array of all products.
//     * Response Code: 200 - Array of products
//     * Returns an empty array if no products exist.


app.get("/api/products", async (req, res) => {
    // console.log(req.params.id)
	try {
		const products = await prisma.Product.findMany()
        console.log(products)
        res.status(200).send(products)
	
        if(products.length === 0){
            res.send([])
        }
	} catch (e) {
		return res.status(500).json({ e });
	}
});


// * PUT /api/products/:id - Updates the product (all fields) with the specified id.
//     * Response Code: 200 - Returns the updated product.
//     * Response Code: 400 - Request missing a product field
//     * Response Code: 404 - Product does not exist.

app.put("/api/products/:id", async (req, res) => {
	console.log(req.params.id, "id");
    const { name, description, imageUrl } = req.body;
	try {
        //     * Response Code: 200 - Returns the updated product.
//     * Response Code: 400 - Request missing a product field
//     * Response Code: 404 - Product does not exist.

app.put("/api/products/:id", async (req, res) => {
	console.log(req.params.id, "id");
    const { name, description, imageUrl } = req.body;
	try {
        // defines existing product and how to identify it via id
        const existingProduct = await prisma.Product.findUnique({
            where: {
              id: req.params.id,
            },
          });
      // if this porduct does not exist return error
          if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" });
          }
      
        const updatedProduct = await prisma.Product.update({
            where: {
                id: req.params.id,
              },
              data: {
                name,
                description,
                imageUrl,
              },
        })
        console.log(updatedProduct, "updated product")
        res.status(200).send(updatedProduct)
	} catch (e) {
		return res.status(400).json({ e });
	}
});
        const updatedProduct = await prisma.Product.update({
            where: {
                id: req.params.id,
              },
              data: {
                name,
                description,
                imageUrl,
              },
        })
        console.log(updatedProduct, "updated product")
        res.status(200).send(updatedProduct)
	} catch (e) {
		return res.status(400).json({ e });
	}
});


//* DELETE /api/products/:id - Deletes the product with the specified id.
//     * Response Code: 200 - Returns the deleted product.
//     * Response Code: 404 - Product does not exist.

app.delete(`/api/products/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      const product = await prisma.Product.delete({
        where: { id },
      });
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.status(200).send(product);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  });
  





app.listen(PORT, () => console.log(`Hola! Server is running on port ${PORT}`))
