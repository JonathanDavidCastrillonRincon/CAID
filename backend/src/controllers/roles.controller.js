import Role from '../models/role';

export const getRoles = async (req, res) => {
    const roles = await Role.find();//arreglo de todos los datos
    res.json(roles);
};

export const getRole = async (req,res) =>{
    const role = await Role.findById(req.params.id);
    res.json(role);
};

export const deleteRole = async(req, res) => {
    await Role.findOneAndDelete(req.params.id);
    res.json({message: 'Rol eliminado'});
};