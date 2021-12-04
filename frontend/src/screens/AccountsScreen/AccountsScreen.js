import React, { useEffect, useState } from "react";
//CSS
import './AccountsScreen.css';
//Components
import CreateCategoryComponent from "../../components/createCategoryComponent/CreateCategoryComponent";
import CreateSubCategoryComponent from "../../components/createSubCategoryComponent/CreateSubCategoryComponent";
//
import * as FaIcons from 'react-icons/fa';
import axios from "axios";
import UpdateCategoryComponent from "../../components/updateCategoryComponent/UpdateCategoryComponent";
import UpdateSubCategoryComponent from "../../components/updateSubCategoryComponent/UpdateSubCategoryComponent";
import CreateAccountComponent from "../../components/createAccountComponent/CreateAccountComponent";
import UpdateAccountsComponent from "../../components/updateAccountsComponent/UpdateAccountsComponent";
import TransferComponent from "../../components/transferComponent/TransferComponent";


const AccountsScreen = ({ history }) => {
    const [mainCategoryMode, setMainCategoryMode] = useState(true);

    const [accountList, setAccountList] = useState([]);
    const [transferList, setTransferList] = useState([]);
    const [refresher, setRefresher] = useState(false);
    const [updateAccount, setUpdateAccount] = useState(false);
    const [accountForUpdate, setAccountForUpdate] = useState("");

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
            history.push("/");
        }
        else {
            getAllAccounts();
            getAllTransfers();
        }
    }, [refresher]);


    const handleChangeMode=()=>{
        setMainCategoryMode(!mainCategoryMode)

        if(mainCategoryMode==true){
            setTimeout(() => {
                document.getElementById("categoryRight").style="display:block";    
            }, 2000);
            
        }   
        else{
            setTimeout(() => {
                document.getElementById("categoryRight").style="display:none";    
            }, 2000);
        } 
    }

    const getAllAccounts = async () => {
        const { data } = await axios.get(
            "/api/account/" + JSON.parse(localStorage.getItem("userInfo"))._id
        );
        let tempAccountList = [];
        data.accountsList.map((e) => {
            tempAccountList.push(e);
        });
        setAccountList(tempAccountList);
    }

    const getAllTransfers = async () => {
        const { data } = await axios.get(
            "/api/account/transfers/" + JSON.parse(localStorage.getItem("userInfo"))._id
        );
        let tempTransfersList = [];
        data.transfersList.map((e) => {
            tempTransfersList.push(e);
        });
        setTransferList(tempTransfersList);
    }


    const handleDeleteAccount = async (account) => {
        const popup = window.confirm("Are you sure you want to delete your account " + account.name + "?");
        if (popup) {
            setUpdateAccount(false);
            setRefresher(prevState => !prevState);
            const { data } = await axios.delete("/api/account/" + account.id);
        }
    }

    const handleEditAccount = async (account) => {
        setUpdateAccount(false);
        setTimeout(() => {
            setUpdateAccount(true);
        }, 100);
        setAccountForUpdate(account);
    }

    const createDeleteIcon = (account) => {
        const icon = React.createElement(FaIcons["FaTimes"],
            {
                key: "delete" + account.id,
                className: "deleteicon",
                onClick: () => handleDeleteAccount(account)
            });
        return (
            <div
                key={"delete_icon__" + account.id}
                className="categoryIcon"
            >{icon}
            </div>
        );
    };

    const createEditIcon = (account) => {
        const icon = React.createElement(FaIcons["FaPen"],
            {
                key: "edit" + account.id,
                className: "editicon",
                onClick: () => handleEditAccount(account)
            });
        return (
            <div
                key={"edit_icon__" + account.id}
                className="categoryIcon"
            >{icon}
            </div>
        );
    };


    return (
        <div className={mainCategoryMode === false ? "container sign-up-mode" : "container"}>
            <div className="forms-container">
                <div className="signin-signup">
                    {updateAccount
                        ?
                        <UpdateAccountsComponent
                            setRefresher={setRefresher}
                            accountForUpdate={accountForUpdate}
                            setUpdateAccount={setUpdateAccount}
                        />

                        : <CreateAccountComponent
                            setRefresher={setRefresher} />
                    }
                    <TransferComponent
                        setRefresher={setRefresher}
                        accountList={accountList} />
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel" id="categoryLeft">
                    <div className="content">
                        <div className="categoryList__div">
                            <h1 className="center">Your accounts </h1>
                            <hr />
                            {accountList ?
                                accountList.map(account =>
                                    <div className="categoryTab"
                                        key={account.id}
                                        style={{ background: "#2196f3" }}
                                    >
                                        <b>
                                            {account.name}
                                        </b>
                                        &nbsp;
                                        ({account.amount} kn)
                                        &nbsp;&nbsp;
                                        &nbsp;&nbsp;
                                        {createEditIcon(account)}
                                        &nbsp;&nbsp;
                                        {createDeleteIcon(account)}
                                    </div>
                                ) : ""}
                        </div>
                        <button className="btn transparent" id="sign-up-btn" onClick={() => handleChangeMode()}>
                            Transfer
                        </button>
                    </div>
                </div>

                <div className="panel right-panel" id="rightPanel">
                <div className="content" id="categoryRight" style={{display:"none"}}>
                <div className="categoryList__div" id="rightWindow">
                            <h1 className="center">Transfers: </h1>
                            <hr />
                            {transferList ?
                                transferList.map(transfer =>
                                    <div className="categoryTab"
                                        key={transfer.id}
                                        style={{ background: "#2196f3" }}
                                    >
                                        {accountList.filter(acc => acc?.id === transfer?.sender)[0]?.name}
                                        {">"}
                                        {accountList.filter(acc => acc?.id === transfer?.receiver)[0]?.name}
                                        {"("+transfer.amount+" kn)"}
                                    </div>
                                ).reverse() : ""}
                        </div>
                        <br/>
                        <button className="btn transparent" id="sign-up-btn" onClick={() => handleChangeMode()}>
                            Add account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountsScreen;