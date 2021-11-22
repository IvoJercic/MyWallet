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


const AccountsScreen = ({ history }) => {
    const [accountList, setAccountList] = useState([]);
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

        }
    }, [refresher]);

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
        <div className={"container"}>
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
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <div className="categoryList__div">
                            <h1 className="center">Your accounts </h1>
                            <hr />
                            {accountList ?
                                accountList.map(account =>
                                    <div className="categoryTab"
                                        key={account.id}
                                        style={{ background: "#2196f3" }}
                                    // onClick={(e) => toggleDiv(e)}
                                    >

                                        <b>
                                            {account.name}

                                        </b>
                                        &nbsp;&nbsp;
                                        &nbsp;&nbsp;
                                        {createEditIcon(account)}
                                        &nbsp;&nbsp;
                                        {createDeleteIcon(account)}
                                    </div>
                                ) : ""}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountsScreen;