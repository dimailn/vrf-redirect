import {Effect} from 'vrf'
import urljoin from 'url-join'


export default (
  {
    redirectTo = (path, form) => form.$router.replace(path),
    prefix = (form) => ""
  } :  {
    redirectTo?: (path: string, form: any) => void,
    prefix?: (form: any) => string
  } = {}
) : Effect => {
  return {
    name: 'redirect',
    effect({onCreated, form, strings: { urlResourceCollectionName}}){
      onCreated((event) => {
        event.stopPropagation()

        const {payload: {id}} = event

        redirectTo(
          urljoin(
            prefix(form),
            urlResourceCollectionName(),
            String(id)
          ),
          form
        )
      })
    }
  }
}
