import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';


export default function RepositoryLinkReleasesComponent({ params, }): JSX.Element {

    const vis: string = params.row.visibility;
    return <>
        {vis === 'public' && <Link
            variant="h4" target='_new'
            href={params.value} > URL
        </Link>}
        {vis === 'private' && <VisibilityOffIcon
        // target='_new' href={params.value} 
        >
        </VisibilityOffIcon>}

    </>

}