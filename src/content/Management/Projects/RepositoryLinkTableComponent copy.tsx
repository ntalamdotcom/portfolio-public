// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';


export default function RepositoryLinkNameTableComponent({ params, }): JSX.Element {

    const vis: string = params.row.visibility;
    return <>
        {vis === 'private' && <Link
            variant="h4" target='_new'
            href={params.value} > URL
        </Link>}
        {vis === 'public'
            && params.value
        }

    </>

}