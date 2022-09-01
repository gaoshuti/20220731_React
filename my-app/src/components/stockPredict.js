function FormDemo(props) {
  const onFormLayoutChange=()=>{
    console.log('onformlayoutchange');
  };
  var plainOptions = ['0', '1', '2', '3', '4'];
  const onChange = (list) => {
    props.setChecked(list,!!list.length && list.length < plainOptions.length,list.length === plainOptions.length);
  };
  const onCheckAllChange = (e) => {
    props.setChecked(e.target.checked ? plainOptions : [],false,e.target.checked);
  };
  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="label">
          <Checkbox indeterminate={props.indeterminate} onChange={onCheckAllChange} checked={props.checkAll}>
            全选
          </Checkbox>
          <CheckboxGroup options={plainOptions} value={props.checkedList} onChange={onChange} />
          <Divider />
          <Divider />
        </Form.Item>
        <Form.Item label="label">
          <Radio.Group>
            <Radio value="tur"> 换手率 </Radio>
            <Radio value="ret"> 回归率 </Radio>
          </Radio.Group>
        </Form.Item>
        
        <Form.Item label="Model">
          <Select>
            <Select.Option value="linear">线性回归</Select.Option>
            <Select.Option value="OLS">OLS回归</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [
                  {
                    title: 'Bamboo',
                    value: 'bamboo',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
      </Form>
    </>
  );
};