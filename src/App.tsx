import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';

import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import TableOne from './components/Tables/TableOne';
import TableTwo from './components/Tables/TableTwo';
import TableThree from './components/Tables/TableThree';
import DefaultLayout from './layout/DefaultLayout';
import Breadcrumb from './components/Breadcrumbs/Breadcrumb';

import EditFormComponent from './components/Forms/EditFormUts';
import TableFour from './components/Tables/TableFour';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {/* <FormElements /> */}
            </>
          }
        />
        <Route
          path="/master-data-prioties"
          element={
            <>
              <PageTitle title="Master data priorities" />
              {/* <FormElements /> */}
              <DefaultLayout>
                <Breadcrumb pageName="Tables" />

                <div className="flex flex-col gap-10">
                  <TableOne />
                </div>
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/master-data-departments"
          element={
            <>
              <PageTitle title="Master data department" />
              {/* <FormElements /> */}
              <DefaultLayout>
                <Breadcrumb pageName="Tables" />

                <div className="flex flex-col gap-10">
                  <TableTwo />
                </div>
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/customer-services"
          element={
            <>
              <PageTitle title="Customer Services" />
              {/* <FormElements /> */}
              <DefaultLayout>
                <Breadcrumb pageName="Tables" />

                <div className="flex flex-col gap-10">
                  <TableThree />
                </div>
              </DefaultLayout>
            </>
          }
        />
        {/* <Route
          path="/customer-service/:id_customer_service/edit"
          element={<EditFormComponent />}
        /> */}

        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/customer-services/2255011004"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Table Customer Services Darma Wiguna" />
              {/* <Tables /> */}
              <DefaultLayout>
                <Breadcrumb pageName="Tables Customer Services Darma Wiguna" />

                <div className="flex flex-col gap-10">
                  <TableFour />
                </div>
              </DefaultLayout>
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
