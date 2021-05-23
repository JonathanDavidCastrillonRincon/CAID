import Role from '../models/role'
export const createRoles = async () =>{
    const count = await Role.estimatedDocumentCount()

    try {
        if (count > 0) return;

        const values = await Promise.all([
            new Role({name: "admin"}).save(),
            new Role({name: "teacher"}).save(),
            new Role({name: "committee"}).save(),
            new Role({name: "headofarea"}).save(),
            new Role({name: "visitor"}).save()
        ]);
        console.log(values);
    } catch (error) {
        console.error(error);
    }
}