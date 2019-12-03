function aceOwner_ItemSelected(sender, e) {
    var OwnerIDValue = document.getElementById("<%=hfOwnerID.ClientID%>");
    OwnerIDValue.value = e.get_value();
}

//<script type="text/javascript" src="Js/HouseInsert.js"></script>