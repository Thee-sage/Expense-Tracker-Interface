"use client";
import axios from 'axios';
import React, { useState, useEffect,useRef} from 'react';
import styles from "./page.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { FiMinusCircle } from "react-icons/fi";
import { GoPlusCircle, GoArrowSwitch } from "react-icons/go";
import { motion } from 'framer-motion';
import { CiCalendar } from "react-icons/ci";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { Select, MenuItem } from '@mui/material';
import { FaAngleDown } from "react-icons/fa6";

const categories = [
    { value: 'housing', label: 'Housing' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'food', label: 'Food' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'personalCare', label: 'Personal Care' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'education', label: 'Education' },
    { value: 'debtPayments', label: 'Debt Payments' },
    { value: 'savingsInvestments', label: 'Savings and Investments' },
    { value: 'giftsDonations', label: 'Gifts and Donations' },
    { value: 'childcare', label: 'Childcare' },
    { value: 'pets', label: 'Pets' },
    { value: 'travel', label: 'Travel' },
    { value: 'miscellaneous', label: 'Miscellaneous' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'restaurants', label: 'Restaurants' },
    { value: 'subscriptions', label: 'Subscriptions' },
    { value: 'internet', label: 'Internet' },
    { value: 'phone', label: 'Phone' },
    { value: 'gym', label: 'Gym' },
    { value: 'parking', label: 'Parking' },
    { value: 'publicTransport', label: 'Public Transport' },
    { value: 'fuel', label: 'Fuel' },
    { value: 'carMaintenance', label: 'Car Maintenance' },
    { value: 'homeMaintenance', label: 'Home Maintenance' },
    { value: 'rent', label: 'Rent' },
    { value: 'mortgage', label: 'Mortgage' },
    { value: 'propertyTax', label: 'Property Tax' },
    { value: 'homeInsurance', label: 'Home Insurance' },
    { value: 'lifeInsurance', label: 'Life Insurance' },
    { value: 'healthInsurance', label: 'Health Insurance' },
    { value: 'dentalCare', label: 'Dental Care' },
    { value: 'visionCare', label: 'Vision Care' },
    { value: 'medications', label: 'Medications' },
    { value: 'doctorVisits', label: 'Doctor Visits' },
    { value: 'vacations', label: 'Vacations' },
    { value: 'movies', label: 'Movies' },
    { value: 'concerts', label: 'Concerts' },
    { value: 'hobbies', label: 'Hobbies' },
    { value: 'books', label: 'Books' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'officeSupplies', label: 'Office Supplies' },
    { value: 'garden', label: 'Garden' },
    { value: 'homeImprovement', label: 'Home Improvement' },
    { value: 'tools', label: 'Tools' },
    { value: 'alcohol', label: 'Alcohol' },
    { value: 'cigarettes', label: 'Cigarettes' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'haircuts', label: 'Haircuts' },
    { value: 'spa', label: 'Spa' },
    { value: 'massage', label: 'Massage' },
    { value: 'sports', label: 'Sports' },
    { value: 'babySupplies', label: 'Baby Supplies' },
    { value: 'toys', label: 'Toys' },
    { value: 'gifts', label: 'Gifts' },
    { value: 'charity', label: 'Charity' },
    { value: 'taxes', label: 'Taxes' },
    { value: 'legalFees', label: 'Legal Fees' },
    { value: 'accounting', label: 'Accounting' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'investments', label: 'Investments' },
    { value: 'savings', label: 'Savings' },
];

const ComponentName = () => {
    const [selected, setSelected] = useState('expenses');
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [showCategoryOptions, setShowCategoryOptions] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAmountValid, setIsAmountValid] = useState(true);
    const [isFormComplete, setIsFormComplete] = useState(false);
    const categoryRef = useRef(null);
    const accountRef = useRef(null);
    const initialTransactionData = {
        description: '',
        account: "",
        amount: '',
        currency: 'USD',
        category: null,
        date: new Date(),
        type: selected
    };

    const [transactionData, setTransactionData] = useState(initialTransactionData);

    const handleAddTransaction = () => {
        if (!isFormComplete) {
            return;
        }

        console.log("Transaction Data: ", transactionData);
        resetTransactionData();
    };

    const resetTransactionData = () => {
        setTransactionData({ ...initialTransactionData, type: selected });
        setIsAmountValid(true);
        setIsFormComplete(false);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'amount') {
            setIsAmountValid(value !== '0');
        }

        setTransactionData({
            ...transactionData,
            [name]: value
        });
        checkFormCompletion({ ...transactionData, [name]: value });
    };

    const handleSelectOption = (value) => {
        setTransactionData({
            ...transactionData,
            account: value
        });
        setShowOptions(false);
        checkFormCompletion({ ...transactionData, account: value });
    };

    const handleCategoryChange = (category) => {
        setTransactionData({
            ...transactionData,
            category
        });
        setSearchTerm('');
        setShowCategoryOptions(false);
        checkFormCompletion({ ...transactionData, category });
    };
    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountRef.current && !accountRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleDateChange = (date) => {
        setTransactionData({
            ...transactionData,
            date
        });
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
          if (categoryRef.current && !categoryRef.current.contains(event.target)) {
              setShowCategoryOptions(false);
          }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [categoryRef]);

  const filteredCategories = categories.filter((category) =>
  category.label.toLowerCase().includes(searchTerm.toLowerCase())
);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get('https://openexchangerates.org/api/currencies.json', {
                    params: {
                        app_id: 'YOUR_API_KEY'
                    }
                });
                setCurrencies(Object.keys(response.data));
            } catch (error) {
                console.error("Error fetching currencies:", error);
            }
        };

        fetchCurrencies();
    }, []);
    const checkFormCompletion = (data) => {
        const isComplete = data.description && data.account && data.amount && data.currency && data.category && data.amount !== '0';
        setIsFormComplete(isComplete);
    };

    const currencySymbolMap = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        AUD: 'A$',
        CAD: 'C$',
        CHF: 'Fr.',
        CNY: '¥',
        HKD: 'HK$',
        NZD: 'NZ$',
        INR: '₹',
        SGD: 'S$',
        KRW: '₩',
        SEK: 'kr',
        NOK: 'kr',
        MXN: 'Mex$',
        RUB: '₽',
        ZAR: 'R',
        TRY: '₺',
        BRL: 'R$',
        ARS: '$',
        IDR: 'Rp',
        PHP: '₱',
        THB: '฿',
        COP: 'Col$',
        CLP: '$',
        PEN: 'S/.',
        VND: '₫',
        MYR: 'RM',
        IQD: 'ع.د',
        AED: 'د.إ',
        SAR: 'ر.س',
        QAR: 'ر.ق',
        UAH: '₴',
        HUF: 'Ft',
        CZK: 'Kč',
        PLN: 'zł',
        DKK: 'kr',
        ISK: 'kr',
        HRK: 'kn',
        RON: 'lei',
        BGN: 'лв',
        SGD: 'S$',
        THB: '฿',
        KWD: 'د.ك',
        BHD: '.د.ب',
        OMR: 'ر.ع.',
        JOD: 'د.ا',
        LBP: 'ل.ل.',
        NGN: '₦',
        EGP: 'ج.م',
    };

    const getCurrencySymbol = (currencyCode) => {
        return currencySymbolMap[currencyCode] || currencyCode;
    };

    const sliderPosition = {
        expenses: { left: '1%' },
        income: { left: '34%' },
        transfer: { left: '66.7%' }
    };

    const getContent = () => {
        switch (selected) {
            case 'expenses':
                return (
                    <div style={{ color: "#a4a4a4" }}>
                        <div className={styles.container}>
                            Description
                            <input
                                name="description"
                                value={transactionData.description}
                                className={styles.input}
                                onChange={handleInputChange}
                                autoComplete="off"
                                placeholder="Describe transaction ..."
                            />
                        </div>

                        <div className={styles.container2} tabIndex={0} ref={accountRef}>
                            Account
                            <div className={styles.select}>
                                <div className={`${styles.selectvalue} ${transactionData.account ? styles.selected : ''}`} onClick={() => setShowOptions(!showOptions)}>
                                    {transactionData.account || 'Search Accounts'}
                                    <FaAngleDown className={styles.down} />
                                </div>
                                {showOptions && (
                                    <div className={styles.glass}>
                                        <div onClick={() => handleSelectOption("Account 1")}>Account 1</div>
                                        <div onClick={() => handleSelectOption("Account 2")}>Account 2</div>
                                        <div onClick={() => handleSelectOption("Account 3")}>Account 3</div>
                                        <div onClick={() => handleSelectOption("Account 4")}>Account 4</div>
                                        <div onClick={() => handleSelectOption("Account 5")}>Account 5</div>
                                        <div onClick={() => handleSelectOption("Account 6")}>Account 6</div>
                                        <div onClick={() => handleSelectOption("Account 7")}>Account 7</div>
                                        <div onClick={() => handleSelectOption("Account 8")}>Account 8</div>
                                        <div onClick={() => handleSelectOption("Account 9")}>Account 9</div>
                                        <div onClick={() => handleSelectOption("Account 10")}>Account 10</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.container3}>
                            Amount
                            <div>
                                <div className={styles.currency}>
                                    {getCurrencySymbol(transactionData.currency)}
                                    <input
                                        className={styles.input2}
                                        name="amount"
                                        type="number"
                                        placeholder="0.00"
                                        value={transactionData.amount}
                                        onChange={handleInputChange}
                                    />
                                    <div style={{ position: "absolute", right: "10px", top: "12px" }}>
                                        <Select
                                            className={styles.currency}
                                            name="currency"
                                            value={transactionData.currency}
                                            onChange={handleInputChange}
                                            sx={{
                                                width: 90,
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    border: 'none',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none',
                                                },
                                            }}
                                            MenuProps={{
                                                classes: { paper: styles.paper },
                                            }}
                                        >
                                            {currencies.map(curr => (
                                                <MenuItem key={curr} value={curr} style={{ width: '100%' }}>
                                                    {curr}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                {!isAmountValid && <div className={styles.errorMessage}>Amount cannot be zero.</div>}
                            </div>
                        </div>

                        <div className={styles.container4}>
                            Category
                            <div tabIndex={0} ref={categoryRef} className={styles.input}>
    <div style={{ display: "flex", flexDirection: "row" }} onClick={() => setShowCategoryOptions(!showCategoryOptions)}>
        <input
            type="text"
            placeholder="Search categories..."
            value={transactionData.category ? transactionData.category.label : ''}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
        />
        <FaAngleDown className={styles.down} />
    </div>
    {showCategoryOptions && (
        <div className={styles.glass}>
            {filteredCategories.map((category) => (
                <div key={category.value} onClick={() => handleCategoryChange(category)}>
                    {category.label}
                </div>
            ))}
        </div>
    )}
</div>
</div>


                        
<div className={styles.container5}>
    Date
    <div className={styles.select2}>
        {transactionData.date.toDateString()}
        <button className={styles.calendar}onClick={() => setShowCalendar(!showCalendar)}>
            <CiCalendar />
        </button>
        {showCalendar && (
            <div style={{ position: "relative", zIndex: "2" }}>
                <Calendar
                    onChange={(date) => {
                        handleDateChange(date);
                        setShowCalendar(false);
                    }}
                    value={transactionData.date}
                />
            </div>
        )}
    </div>
</div>
<div>
<button
                onClick={handleAddTransaction}
                className={`${styles.putin} ${!isFormComplete ? styles.putin2 : ''}`}
                disabled={!isFormComplete}
            >
                Add Transaction
            </button>
    </div>
</div>
                );
            case 'income':
                return (
                    <div style={{ color: "#a4a4a4" }}>
                        <div className={styles.container}>
                            Description
                            <input
                                name="description"
                                value={transactionData.description}
                                className={styles.input}
                                onChange={handleInputChange}
                                autoComplete="off"
                                placeholder="Describe transaction ..."
                            />
                        </div>

                        <div className={styles.container2} tabIndex={0} ref={accountRef}>
                            Account
                            <div className={styles.select}>
                                <div className={`${styles.selectvalue} ${transactionData.account ? styles.selected : ''}`} onClick={() => setShowOptions(!showOptions)}>
                                    {transactionData.account || 'Search Accounts'}
                                    <FaAngleDown className={styles.down} />
                                </div>
                                {showOptions && (
                                    <div className={styles.glass}>
                                        <div onClick={() => handleSelectOption("Account 1")}>Account 1</div>
                                        <div onClick={() => handleSelectOption("Account 2")}>Account 2</div>
                                        <div onClick={() => handleSelectOption("Account 3")}>Account 3</div>
                                        <div onClick={() => handleSelectOption("Account 4")}>Account 4</div>
                                        <div onClick={() => handleSelectOption("Account 5")}>Account 5</div>
                                        <div onClick={() => handleSelectOption("Account 6")}>Account 6</div>
                                        <div onClick={() => handleSelectOption("Account 7")}>Account 7</div>
                                        <div onClick={() => handleSelectOption("Account 8")}>Account 8</div>
                                        <div onClick={() => handleSelectOption("Account 9")}>Account 9</div>
                                        <div onClick={() => handleSelectOption("Account 10")}>Account 10</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.container3}>
                            Amount
                            <div>
                                <div className={styles.currency}>
                                    {getCurrencySymbol(transactionData.currency)}
                                    <input
                                        className={styles.input2}
                                        name="amount"
                                        type="number"
                                        placeholder="0.00"
                                        value={transactionData.amount}
                                        onChange={handleInputChange}
                                    />
                                    <div style={{ position: "absolute", right: "10px", top: "12px" }}>
                                        <Select
                                            className={styles.currency}
                                            name="currency"
                                            value={transactionData.currency}
                                            onChange={handleInputChange}
                                            sx={{
                                                width: 90,
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    border: 'none',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none',
                                                },
                                            }}
                                            MenuProps={{
                                                classes: { paper: styles.paper },
                                            }}
                                        >
                                            {currencies.map(curr => (
                                                <MenuItem key={curr} value={curr} style={{ width: '100%' }}>
                                                    {curr}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                {!isAmountValid && <div className={styles.errorMessage}>Amount cannot be zero.</div>}
                            </div>
                        </div>
                        <div className={styles.container4}>
                            Category
                            <div tabIndex={0} ref={categoryRef} className={styles.input}>
    <div style={{ display: "flex", flexDirection: "row" }} onClick={() => setShowCategoryOptions(!showCategoryOptions)}>
        <input
            type="text"
            placeholder="Search categories..."
            value={transactionData.category ? transactionData.category.label : ''}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
        />
        <FaAngleDown className={styles.down} />
    </div>
    {showCategoryOptions && (
        <div className={styles.glass}>
            {filteredCategories.map((category) => (
                <div key={category.value} onClick={() => handleCategoryChange(category)}>
                    {category.label}
                </div>
            ))}
        </div>
    )}
</div>
</div>


                        
<div className={styles.container5}>
    Date
    <div className={styles.select2}>
        {transactionData.date.toDateString()}
        <button className={styles.calendar}onClick={() => setShowCalendar(!showCalendar)}>
            <CiCalendar />
        </button>
        {showCalendar && (
            <div style={{ position: "relative", zIndex: "2" }}>
                <Calendar
                    onChange={(date) => {
                        handleDateChange(date);
                        setShowCalendar(false);
                    }}
                    value={transactionData.date}
                />
            </div>
        )}
    </div>
</div>
<div>
<button
                onClick={handleAddTransaction}
                className={`${styles.putin} ${!isFormComplete ? styles.putin2 : ''}`}
                disabled={!isFormComplete}
            >
                Add Income receipt
            </button>
    </div>
</div>
                );
            case 'transfer':
                return (
                    <div style={{ color: "#a4a4a4" }}>
                        <div className={styles.container}>
                            Description
                            <input
                                name="description"
                                value={transactionData.description}
                                className={styles.input}
                                onChange={handleInputChange}
                                autoComplete="off"
                                placeholder="Describe transaction ..."
                            />
                        </div>

                        <div className={styles.container2} tabIndex={0} ref={accountRef}>
                            Account
                            <div className={styles.select}>
                                <div className={`${styles.selectvalue} ${transactionData.account ? styles.selected : ''}`} onClick={() => setShowOptions(!showOptions)}>
                                    {transactionData.account || 'Search Accounts'}
                                    <FaAngleDown className={styles.down} />
                                </div>
                                {showOptions && (
                                    <div className={styles.glass}>
                                        <div onClick={() => handleSelectOption("Account 1")}>Account 1</div>
                                        <div onClick={() => handleSelectOption("Account 2")}>Account 2</div>
                                        <div onClick={() => handleSelectOption("Account 3")}>Account 3</div>
                                        <div onClick={() => handleSelectOption("Account 4")}>Account 4</div>
                                        <div onClick={() => handleSelectOption("Account 5")}>Account 5</div>
                                        <div onClick={() => handleSelectOption("Account 6")}>Account 6</div>
                                        <div onClick={() => handleSelectOption("Account 7")}>Account 7</div>
                                        <div onClick={() => handleSelectOption("Account 8")}>Account 8</div>
                                        <div onClick={() => handleSelectOption("Account 9")}>Account 9</div>
                                        <div onClick={() => handleSelectOption("Account 10")}>Account 10</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.container3}>
                            Amount
                            <div>
                                <div className={styles.currency}>
                                    {getCurrencySymbol(transactionData.currency)}
                                    <input
                                        className={styles.input2}
                                        name="amount"
                                        type="number"
                                        placeholder="0.00"
                                        value={transactionData.amount}
                                        onChange={handleInputChange}
                                    />
                                    <div style={{ position: "absolute", right: "10px", top: "12px" }}>
                                        <Select
                                            className={styles.currency}
                                            name="currency"
                                            value={transactionData.currency}
                                            onChange={handleInputChange}
                                            sx={{
                                                width: 90,
                                                '.MuiOutlinedInput-notchedOutline': {
                                                    border: 'none',
                                                },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none',
                                                },
                                            }}
                                            MenuProps={{
                                                classes: { paper: styles.paper },
                                            }}
                                        >
                                            {currencies.map(curr => (
                                                <MenuItem key={curr} value={curr} style={{ width: '100%' }}>
                                                    {curr}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                {!isAmountValid && <div className={styles.errorMessage}>Amount cannot be zero.</div>}
                            </div>
                        </div>
                        <div className={styles.container4}>
                            Category
                            <div tabIndex={0} ref={categoryRef} className={styles.input}>
    <div style={{ display: "flex", flexDirection: "row" }} onClick={() => setShowCategoryOptions(!showCategoryOptions)}>
        <input
            type="text"
            placeholder="Search categories..."
            value={transactionData.category ? transactionData.category.label : ''}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
        />
        <FaAngleDown className={styles.down} />
    </div>
    {showCategoryOptions && (
        <div className={styles.glass}>
            {filteredCategories.map((category) => (
                <div key={category.value} onClick={() => handleCategoryChange(category)}>
                    {category.label}
                </div>
            ))}
        </div>
    )}
</div>
</div>


                        
<div className={styles.container5}>
    Date
    <div className={styles.select2}>
        {transactionData.date.toDateString()}
        <button className={styles.calendar}onClick={() => setShowCalendar(!showCalendar)}>
            <CiCalendar />
        </button>
        {showCalendar && (
            <div style={{ position: "relative", zIndex: "2" }}>
                <Calendar
                    onChange={(date) => {
                        handleDateChange(date);
                        setShowCalendar(false);
                    }}
                    value={transactionData.date}
                />
            </div>
        )}
    </div>
</div>
<div>
<button
                onClick={handleAddTransaction}
                className={`${styles.putin} ${!isFormComplete ? styles.putin2 : ''}`}
                disabled={!isFormComplete}
            >
                Add Transfer
            </button>
    </div>
</div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "grey", width: "100%", height: "1200px" }}>
            <div className={styles.maincontainer}>
            <div className={styles.main}>
                <div style={{ display: "inline-block" }} className={styles.newtransaction}>New transaction</div>
                <div className={styles.x}>
                    <IoCloseSharp />
                </div>
                <div className={styles.block}>
                    <motion.div
                        className={styles.slider}
                        initial={{ left: '10%' }}
                        animate={{ left: sliderPosition[selected].left }}
                        transition={{ duration: 0.3 }}
                    />
                    <div className={styles.blocktext}>
                        <div className={styles.expenses} onClick={() => setSelected('expenses')}><FiMinusCircle style={{ position: "relative", top: "5px", right: "7px" }} />Expenses</div>
                        <div className={styles.income} onClick={() => setSelected('income')}><GoPlusCircle style={{ position: "relative", top: "5px", right: "7px" }} />Income</div>
                        <div className={styles.transfer} onClick={() => setSelected('transfer')}><GoArrowSwitch style={{ position: "relative", top: "5px", right: "7px" }} />Transfer</div>
                    </div>
                    {getContent()}
                </div>
            </div>
            </div>
        </div>
    )
}

export default ComponentName;
