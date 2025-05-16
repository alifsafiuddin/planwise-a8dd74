import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const AiFinancialAdviceCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [userId, setUserId] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [userId], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.adviceId)) {
                error["adviceId"] = `Advice ID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.adviceSummary)) {
                error["adviceSummary"] = `Advice Summary field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.investmentTips)) {
                error["investmentTips"] = `Investment Tips field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.budgetTips)) {
                error["budgetTips"] = `Budget Tips field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.aiModelVersion)) {
                error["aiModelVersion"] = `Ai Model Version field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            adviceId: _entity?.adviceId,userId: _entity?.userId?._id,adviceSummary: _entity?.adviceSummary,investmentTips: _entity?.investmentTips,budgetTips: _entity?.budgetTips,aiModelVersion: _entity?.aiModelVersion,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("aiFinancialAdvice").create(_data);
        const eagerResult = await client
            .service("aiFinancialAdvice")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "userId",
                    service : "users",
                    select:["userId"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info AiFinancialAdvice updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in AiFinancialAdvice" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setUserId(res.data.map((e) => { return { name: e['userId'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const userIdOptions = userId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create AiFinancialAdvice" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="aiFinancialAdvice-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="adviceId">Advice ID:</label>
                <InputText id="adviceId" className="w-full mb-3 p-inputtext-sm" value={_entity?.adviceId} onChange={(e) => setValByKey("adviceId", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["adviceId"]) ? (
              <p className="m-0" key="error-adviceId">
                {error["adviceId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="userId">User ID:</label>
                <Dropdown id="userId" value={_entity?.userId?._id} optionLabel="name" optionValue="value" options={userIdOptions} onChange={(e) => setValByKey("userId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["userId"]) ? (
              <p className="m-0" key="error-userId">
                {error["userId"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="adviceSummary">Advice Summary:</label>
                <InputText id="adviceSummary" className="w-full mb-3 p-inputtext-sm" value={_entity?.adviceSummary} onChange={(e) => setValByKey("adviceSummary", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["adviceSummary"]) ? (
              <p className="m-0" key="error-adviceSummary">
                {error["adviceSummary"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="investmentTips">Investment Tips:</label>
                <InputText id="investmentTips" className="w-full mb-3 p-inputtext-sm" value={_entity?.investmentTips} onChange={(e) => setValByKey("investmentTips", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["investmentTips"]) ? (
              <p className="m-0" key="error-investmentTips">
                {error["investmentTips"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="budgetTips">Budget Tips:</label>
                <InputText id="budgetTips" className="w-full mb-3 p-inputtext-sm" value={_entity?.budgetTips} onChange={(e) => setValByKey("budgetTips", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["budgetTips"]) ? (
              <p className="m-0" key="error-budgetTips">
                {error["budgetTips"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="aiModelVersion">Ai Model Version:</label>
                <InputText id="aiModelVersion" className="w-full mb-3 p-inputtext-sm" value={_entity?.aiModelVersion} onChange={(e) => setValByKey("aiModelVersion", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["aiModelVersion"]) ? (
              <p className="m-0" key="error-aiModelVersion">
                {error["aiModelVersion"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(AiFinancialAdviceCreateDialogComponent);
