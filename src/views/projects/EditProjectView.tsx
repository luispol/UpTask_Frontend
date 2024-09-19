import { Navigate, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getProjectById } from "@/api/ProjectAPI"
import EditProjectForm from '../../components/projects/EditProjectForm';

export default function EditProjectView() {

    const params = useParams()

    const projectId = params.projectId!

    const {data ,isLoading, isError } = useQuery({
        // No pueden a ver queryKeys iguales en todo el proyecto
        queryKey: ['editProject',{projectId}],
        // Cuando pasas parametros, tienes que poner siempre la sintaxis de flecha
        queryFn: () => getProjectById(projectId),
        // Esto lo que hace, intenta hacer la conexion y si no lo encuentra cancelalo y va hacer mas rapido la consulta
        retry: false
    })

    if (isLoading) return 'Cargando...'

    if (isError) return <Navigate to='/404'/>

  if (data) return <EditProjectForm data={data} projectId={projectId}/>
}
