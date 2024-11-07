https://stackoverflow.com/questions/65848442/property-user-does-not-exist-on-type-requestparamsdictionary-any-any-pars

# REPO: https://github.com/NaimishVerma17/prisma-resources/blob/main/src/controllers/orders.ts

# start from: (https://www.youtube.com/watch?v=VSy6sYMzbZ4&list=PLaY6YJMqp51dW3zHhw0Iqy8hI86SKI8n-&index=25&ab_channel=Evoqys)

# https://blog.logrocket.com/how-to-set-up-node-typescript-express/

# TODO
- add validation for Products
- on delete USERS delete all afferent ADDRESSES - see how can you do that
- check how to add zod validation to edit 
- move ProductSchemaValidator to schema/product - from schema/users
- check for Prisma unique fields validation
- add types for every controller - as in orders.ts

# LEARN:
- Prisma's update/delete/etc. operation does not return null if the product is not found. Instead, if the product with the specified ID does not exist, Prisma will throw an error internally (specifically a PrismaClientKnownRequestError with a code like P2025 for "Record to update not found").

- the 'meta' prop is available on update/delete

- delete function from Prisma only allows filtering on the primary key (id). You cannot combine additional filters (e.g., userId) directly in the where clause of a delete statement. Instead, you should first verify that the cartItem exists and belongs to the authenticated user before attempting to delete it.

- export const getCart = async (req: Request, res:Response) => {
    const cart = await prismaClient.cartItem.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            product: true // include the relation
        }
    });

    res.status(200).send({ cart })}

    without include -> 
        {"cart": [
            {
                "id": 28,
                "createdAt": "2024-09-29T12:03:11.526Z",
                "updatedAt": "2024-09-29T12:03:11.526Z",
                "quantity": 1,
                "userId": 1,
                "productId": 2
            }
        ]}

    with include -> it will include all the dates about + "product": {...allProductData for productId: 2}


- a Prisma transaction allows you to execute multiple database operations in a single, atomic operation. This means that all operations within the transactio either succeed or fail together, ensuring data integrity and consistency. If any part of the transaction fails, none of the changes are committed to the database.

