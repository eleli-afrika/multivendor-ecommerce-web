import React, { useEffect, useState } from 'react';
import { BsFillImageFill, BsImages } from 'react-icons/bs';
import close from '../../assets/close.png';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../Redux/hooks/Ads.actions';
import { setLoader } from '../../Redux/slices/LoaderSlice';
import { toast } from 'react-toastify';
import { ProductData, subcategoryData } from '../../interface/common';
import { setCategories } from '../../Redux/slices/categoriesSlice';
import { fetchCategories } from '../../Redux/hooks/categories.actions';
import { axiosService } from '../../Redux/helpers/axios';
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import Loader from '../../constants/loader';
// import Loader from '../../constants/loader';

// Define the types for your props
type AdFormProps = {
    showAdsForm: boolean;
    setShowAdsForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdForm: React.FC<AdFormProps> = ({ showAdsForm, setShowAdsForm }) => {
    const categories = useSelector((state: any) => state.categories.categories);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [subcategories, setSubcategories] = useState<subcategoryData[]>([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getCategory = async () => {
        setLoading(true);
        const response = await fetchCategories();
        dispatch(setCategories(response.data.Data));
        setLoading(false);
    };

    useEffect(() => {
        getCategory();

        if (selectedCategory === null) {
            setSelectedCategory('');
        }

        if (selectedCategory) {
            setFormData((prevData) => ({
                ...prevData,
                category: selectedCategory,
            }));
        }
    }, []);

    const tryfetchingSubcategories = async (categoryName: string) => {
        try {
            const response = await axiosService.get(
                `/subcategories/getsubcategories/${categoryName}`
            );
            return response.data.Data;
        } catch (error) {
            // console.error("Error fetching subcategories:", error);
            return [];
        }
    };

    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = event.target.value;
        setSelectedCategory(newCategory);

        if (newCategory) {
            setLoading(true);
            const subcategoriesData = await tryfetchingSubcategories(newCategory);
            setSubcategories(subcategoriesData);
            setLoading(false);

            // Update formData.category here
            setFormData((prevData) => ({
                ...prevData,
                category: newCategory,
            }));
        }
    };

    // define formData

    const [formData, setFormData] = useState<ProductData>({
        productname: '',
        productdescription: '',
        productprice: '',
        quantity: 1,
        category: '',
        subcategory: '',
        producttype: '',
        brand: '',
        mainimage: 'null',
        productimages: [],
        producttid: '',
        isactive: true,
        isapproved: false,

        // negotiable: false,
    });

    const [mainimagePreview, setmainimagePreview] = useState<string | null>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const deleteProductImage = (image: File) => {
        // Filter out the image from selectedImages
        const updatedSelectedImages = selectedImages.filter(
            (selectedImage) => selectedImage !== image
        );

        // Find the index of the image in the productimages array
        const imageIndex = selectedImages.findIndex((selectedImage) => selectedImage === image);

        // If the image is found in the productimages array, remove it
        if (imageIndex !== -1) {
            const updatedProductImages = [...formData.productimages];
            updatedProductImages.splice(imageIndex, 1);

            // Update the state with the updated arrays
            setSelectedImages(updatedSelectedImages);
            setFormData((prevData) => ({
                ...prevData,
                productimages: updatedProductImages,
            }));
        }
    };

    const handlemainimageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        // Check if a file was selected
        if (file) {
            // Check if the selected file is an image
            if (!file.type.startsWith('image/')) {
                // If the file is not an image, display an error message
                alert('Please select a cover image');
                e.target.value = ''; // Clear the file input to allow re-selection
                return;
            }

            // Create a URL for the selected file to set as a preview
            const previewURL = URL.createObjectURL(file);

            // Set the mainimagePreview to the preview URL
            setmainimagePreview(previewURL);

            const reader = new FileReader();

            reader.onload = (event) => {
                const base64String = event.target?.result as string;

                // Trim the base64 string to remove the data URL prefix
                const trimmedBase64 = base64String.split(',')[1];

                setFormData((prevData) => ({
                    ...prevData,
                    mainimage: trimmedBase64, // Set mainimage to the trimmed base64 image data
                }));
            };

            reader.readAsDataURL(file); // Convert the file to a base64 data URL
        }
    };

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));

            const minFiles = 1; // Minimum number of files required

            // Check if at least one image file is selected
            if (imageFiles.length < minFiles) {
                toast.error('Please select at least one image.');
                return;
            }

            const maxFiles = 3; // Maximum number of files allowed
            const totalSelectedFiles = selectedImages.length + imageFiles.length;

            // Check if the total number of selected files exceeds the maximum allowed
            if (totalSelectedFiles > maxFiles) {
                toast.error(`You can only upload a maximum of ${maxFiles} files.`);
                return;
            }

            const base64Images = await Promise.all(
                imageFiles.map(async (file) => {
                    // Convert image file to base64
                    return new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const base64String = event.target?.result as string;

                            // Trim the base64 string to remove the data URL prefix
                            const trimmedBase64 = base64String.split(',')[1];

                            resolve(trimmedBase64);
                        };
                        reader.onerror = (error) => reject(error);
                        reader.readAsDataURL(file);
                    });
                })
            );

            setSelectedImages([...selectedImages, ...imageFiles]);
            setFormData((prevData) => ({
                ...prevData,
                productimages: [...prevData.productimages, ...base64Images],
            }));
        }
    };

    // Function to update form data when input values change
    const handleInputChangeno = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]:
                type === 'checkbox'
                    ? (e.target as HTMLInputElement).checked
                    : type === 'number'
                    ? parseInt(value, 10) // Convert to a number here
                    : value,
        }));
    };
    // Function to update form data when input values change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        // Replace special characters with spaces before setting the state
        const sanitizedValue = value.replace(/[^\w\s,.]+/g, ' ');

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : sanitizedValue,
        }));
    };

    // Function to update form data when select inputs change
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // console.log(formData);
    // function to create a new product

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.productdescription.length < 100) {
            toast.error('Product description must be at least 100 characters.');
            return;
        }

        // Check if cover image is uploaded
        if (!formData.mainimage || formData.mainimage === 'null') {
            toast.error('Please upload a cover image.');
            return;
        }

        // Check if at least one gallery image is uploaded
        if (formData.productimages.length === 0) {
            toast.error('Please upload at least one gallery image.');
            return;
        }

        try {
            setLoading(true);
            const response = await createProduct(formData);
            if (response.status === 201) {
                setLoading(false);
                toast.success('product added successfully');
                navigate('/profile/pending');
                setShowAdsForm(false);
            } else {
                toast.success('product not added, Please try again');
                setShowAdsForm(true);
            }
            console.log(response);
        } catch (error: any) {
            // toast.error(error.message || 'Duplicate product!');
            dispatch(setLoader(false));
        }

        // clear form data after submission
        setFormData({
            productname: '',
            productdescription: '',
            productprice: '',
            quantity: 1,
            category: '',
            subcategory: '',
            producttype: '',
            brand: '',
            mainimage: 'null',
            productimages: [],
            producttid: '',
            isactive: true,
            isapproved: false,
        });
        setmainimagePreview(null);
        setSelectedImages([]);
    };

    return (
        <>
            {showAdsForm && (
                <div className="fixed inset-0 h-fit px-[10px] lg:px-5 min-h-full w-full bg-black-200/50 z-50 flex items-center justify-center py-2 overflow-y-auto ">
                    {loading && <Loader />}
                    <form
                        className="w-full lg:w-4/6 h-5/6  rounded-2xl shadow-2xl"
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                    >
                        <div className="w-full h-full flex flex-col md:flex-row overflow-scroll price bg-white px-4 rounded py-4 gap-3">
                            {/* left-side div */}
                            <div className="w-full lg:w-3/6 h-auto rounded-l-2xl p-[5px] lg:p-5 ">
                                <div className="flex flex-col items-end justify-center md:hidden">
                                    <img
                                        src={close}
                                        alt=""
                                        className="h-6 w-6"
                                        onClick={() => setShowAdsForm(false)}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        htmlFor="productname"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Product Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="productname"
                                        name="productname"
                                        value={formData.productname}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                        placeholder="Enter your product name"
                                        // maxLength={50}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        htmlFor="productdescription"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Product description:
                                    </label>
                                    <textarea
                                        id="productdescription"
                                        name="productdescription"
                                        value={formData.productdescription}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange h-auto"
                                        placeholder="Enter your product description"
                                        minLength={50}
                                        style={{ minHeight: '100px' }}
                                        // maxLength={600}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        htmlFor="productprice"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Product Price:
                                    </label>
                                    <input
                                        type="number"
                                        id="productprice"
                                        name="productprice"
                                        value={formData.productprice}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                        placeholder="Enter your product price"
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        htmlFor="quantity"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Product Quantity:
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChangeno}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                        placeholder="Enter your product quantity"
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        htmlFor="category"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Category:
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={handleCategoryChange}
                                        id="category"
                                        name="category"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                        required
                                    >
                                        <option value="">Select a Category</option>
                                        {categories.map((c: any) => (
                                            <option key={c.categoryid} value={c.categoryname}>
                                                {c.categoryname}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-2">
                                    <label
                                        htmlFor="subcategory"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Subcategory:
                                    </label>
                                    <select
                                        value={formData.subcategory || ''}
                                        onChange={handleSelectChange}
                                        id="subcategory"
                                        name="subcategory"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                        required
                                    >
                                        <option value="">Select a Subcategory</option>
                                        {subcategories.map((c) => (
                                            <option
                                                key={c.subcategoryname}
                                                value={c.subcategoryname}
                                            >
                                                {c.subcategoryname}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-2">
                                    <label
                                        htmlFor="producttype"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Condition:
                                    </label>
                                    <select
                                        id="producttype"
                                        name="producttype"
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                        required
                                        value={formData.producttype}
                                        onChange={handleSelectChange}
                                    >
                                        <option value="">Select type</option>{' '}
                                        {/* Empty value for the default option */}
                                        <option value="brand new">Brand New</option>
                                        <option value="refurbished">Refurbished</option>
                                        <option value="exported">Exported</option>
                                        <option value="ex uk">Ex Uk</option>
                                    </select>
                                </div>
                            </div>
                            {/* End of left-side div */}

                            {/* Right side div starts here */}

                            <div className="w-full lg:w-3/6 h-full rounded-r-2xl p-[5px] lg:p-5">
                                <div className="hidden md:flex flex-col items-end justify-center">
                                    <img
                                        src={close}
                                        alt=""
                                        className="h-6 w-6"
                                        onClick={() => setShowAdsForm(false)}
                                    />
                                </div>

                                <div className="mb-2">
                                    <label
                                        htmlFor="Brand"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Brand:
                                    </label>
                                    <input
                                        type="text"
                                        id="brand"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                        placeholder="Enter your brand"
                                        required
                                    />
                                </div>

                                <div className="mb-2">
                                    <label
                                        htmlFor="mainimage"
                                        className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
                                    >
                                        Cover Image:
                                        <div
                                            className={`h-20 w-20 rounded-full border-stone-500 border flex items-center justify-center`}
                                        >
                                            {mainimagePreview ? (
                                                <img
                                                    src={mainimagePreview}
                                                    alt="Cover Image Preview"
                                                    className="w-20 h-20 rounded-full object-cover"
                                                />
                                            ) : (
                                                <BsFillImageFill size={40} />
                                            )}
                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        id="mainimage"
                                        name="mainimage"
                                        className="hidden w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                        placeholder="Upload your cover image"
                                        onChange={handlemainimageChange}
                                        accept=".jpg, .jpeg, .png"
                                    />
                                </div>

                                {/* setup the image gallery here */}

                                <div className="mb-2">
                                    <label
                                        htmlFor="Productimages"
                                        className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
                                    >
                                        Gallery images:
                                        <div
                                            className={`h-20 w-20 rounded-full border-stone-500 border flex items-center justify-center`}
                                        >
                                            <BsImages size={40} />
                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        id="Productimages"
                                        name="Productimages"
                                        className="hidden w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                        placeholder="Upload your cover image"
                                        onChange={handleGalleryUpload}
                                        accept=".jpg, .jpeg, .png"
                                        multiple
                                        max={3}
                                        min={1}
                                    />
                                    <div className="flex gap-2">
                                        {selectedImages.map((image, index) => (
                                            <div
                                                key={index}
                                                className="flex  flex-row h-20 w-20 relative"
                                            >
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Image ${index + 1}`}
                                                    className="object-cover rounded h-full w-full"
                                                />
                                                <Delete
                                                    className="text-red-700 absolute "
                                                    onClick={() => deleteProductImage(image)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* end of image gallery */}

                                <button
                                    type="submit"
                                    className="bg-primary-orange p-2 w-full rounded-xl text-white hover:bg-secondary-orange mt-3"
                                >
                                    Add Product
                                </button>
                            </div>

                            {/* Right div ends here */}
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default AdForm;
