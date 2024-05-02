import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import FormComponent from '../components/Forms/FormUts';

import DefaultLayout from '../layout/DefaultLayout';

const FormUts = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Form " />
        {/* <FormComponent /> */}
      </div>
    </DefaultLayout>
  );
};

export default FormUts;
