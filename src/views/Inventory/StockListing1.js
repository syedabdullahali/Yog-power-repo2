import { cilInfo } from "@coreui/icons";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardTitle,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormTextarea,
    CInputGroup,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
} from "@coreui/react";
import React, { useState } from "react";
import { FaBeer } from "react-icons/fa";

import DataTable from "src/components/DataTable";

import ClothesProduct from "./ClothesProduct";
import AyurvedaMedicine from "./AyurvedaMedicine";
import FitnessProduct from "./FitnessProduct";
import FoodsProduct from "./FoodsProduct";
import GeneralStock from "./GeneralStock"

const StockListing1 = () => {
    const [action, setAction] = useState(false)
    const [activeKey, setActiveKey] = useState(1)





    return (
        <>

            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-3 border-success">
                        <CCardHeader style={{ backgroundColor: '#0B5345', color: 'white' }}>
                            <CNav variant="pills" role="tablist">
                                <CNavItem>
                                    <CNavLink
                                        style={{ color: "white" }}
                                        href="javascript:void(0);"
                                        active={activeKey === 1}
                                        onClick={() => setActiveKey(1)}
                                    >
                                        Clothes product
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        style={{ color: "white" }}
                                        href="javascript:void(0);"
                                        active={activeKey === 2}
                                        onClick={() => setActiveKey(2)}
                                    >

                                        Ayurveda Medicine
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        style={{ color: "white" }}
                                        href="javascript:void(0);"
                                        active={activeKey === 3}
                                        onClick={() => setActiveKey(3)}
                                    >
                                        Fitness Product
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        style={{ color: "white" }}
                                        href="javascript:void(0);"
                                        active={activeKey === 4}
                                        onClick={() => setActiveKey(4)}
                                    >
                                        Foods Product
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink
                                        style={{ color: "white" }}
                                        href="javascript:void(0);"
                                        active={activeKey === 5}
                                        onClick={() => setActiveKey(5)}
                                    >
                                        General Inventory

                                    </CNavLink>
                                </CNavItem>
                            </CNav>
                        </CCardHeader>
                        <CCardBody>
                            <CTabContent>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 1}>
                                    <ClothesProduct />
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 2}>
                                    <AyurvedaMedicine />
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 3}>
                                    <FitnessProduct />
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 4}>
                                    <FoodsProduct />
                                </CTabPane>
                                <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === 5}>
                                    <GeneralStock />
                                </CTabPane>
                            </CTabContent>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};

export default StockListing1;